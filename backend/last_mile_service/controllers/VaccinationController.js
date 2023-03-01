require("dotenv").config();
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const AtomModel = require("../models/AtomModel");
const CounterModel = require("../models/CounterModel");
const DoseModel = require("../models/DoseModel");
const EmployeeModel = require("../models/EmployeeModel");
const InventoryModel = require("../models/InventoryModel");
const OrganisationModel = require("../models/OrganisationModel");
const VaccineVialModel = require("../models/VaccineVialModel");
const WarehouseModel = require("../models/WarehouseModel");
const excel = require("node-excel-export");
const PdfPrinter = require("pdfmake");
const { resolve } = require("path");
const fs = require("fs");
const CountryModel = require("../models/CountryModel");
const { formatDate } = require("../helpers/dateHelper");
const { getDateStringForMongo } = require("../helpers/utility");

const fontDescriptors = {
	Roboto: {
		normal: resolve("./fonts/Roboto-Regular.ttf"),
		bold: resolve("./fonts/Roboto-Medium.ttf"),
		italics: resolve("./fonts/Roboto-Italic.ttf"),
		bolditalics: resolve("./fonts/Roboto-MediumItalic.ttf"),
	},
};
const printer = new PdfPrinter(fontDescriptors);

const buildWarehouseQuery = async (user, city, organisationName) => {
	const userDetails = await EmployeeModel.findOne({ id: user.id });
	const organisation = await OrganisationModel.findOne({
		id: userDetails.organisationId,
	});

	let warehouseIds = userDetails.warehouseId;

	// If user is admin show organisation wide details
	if (userDetails.role === "admin") {
		let warehouses = await WarehouseModel.find({
			organisationId: userDetails.organisationId,
			status: "ACTIVE",
		});
		warehouseIds = warehouses.map((warehouse) => warehouse.id);
	}

	let warehouseQuery = {};
	let queryExprs = [];

	if (userDetails && organisation.type !== "GoverningBody") {
		queryExprs.push({ id: { $in: warehouseIds } });
	}

	if (organisation.type === "GoverningBody" && organisationName) {
		let organisation = await OrganisationModel.findOne({
			status: "ACTIVE",
			name: organisationName,
		});
		let warehouses = await WarehouseModel.find({
			organisationId: organisation.id,
			status: "ACTIVE",
		});
		warehouseIds = warehouses.map((warehouse) => warehouse.id);
		queryExprs.push({ id: { $in: warehouseIds } });
	}

	if (city) {
		queryExprs.push({ "warehouseAddress.city": city });
	}

	if (queryExprs.length) {
		warehouseQuery = {
			$and: queryExprs,
		};
	}

	return warehouseQuery;
};

const buildDoseQuery = async (gender, minAge, maxAge, ageType, vaccineVialIds, today) => {
	let doseQuery = {};
	let queryExprs = vaccineVialIds
		? [{ $in: ["$vaccineVialId", vaccineVialIds] }]
		: [{ $eq: ["$vaccineVialId", "$$vaccineVialId"] }];

	// Modify the if once a new Role is added
	if (gender) {
		queryExprs.push({ $eq: ["$gender", gender] });
	}
	if (ageType) {
		if (minAge) {
			queryExprs.push({ $gte: [ageType === "months" ? "$ageMonths" : "$age", parseInt(minAge)] });
		}
		if (maxAge) {
			queryExprs.push({ $lte: [ageType === "months" ? "$ageMonths" : "$age", parseInt(maxAge)] });
		}
	}
	if (today) {
		let todayString = getDateStringForMongo(new Date());
		queryExprs.push({ $gte: ["$createdDateString", todayString] });
	}

	if (queryExprs.length) {
		doseQuery = {
			$expr: {
				$and: queryExprs,
			},
		};
	}

	return doseQuery;
};

const generateVaccinationsList = async (doseQuery, req, skip = 0, limit) => {
	const pagniationQuery = [];
	if (skip) {
		pagniationQuery.push({ $skip: skip })
	}
	if (limit) {
		pagniationQuery.push({ $limit: limit });
	}
	const dosesResult = await DoseModel.aggregate([
		{ $match: doseQuery },
		{
			$lookup: {
				from: "vaccinevials",
				localField: "vaccineVialId",
				foreignField: "id",
				as: "vaccineVial",
			},
		},
		{ $unwind: "$vaccineVial" },
		{
			$lookup: {
				from: "products",
				localField: "vaccineVial.productId",
				foreignField: "id",
				as: "product",
			},
		},
		{ $unwind: "$product" },
		{
			$lookup: {
				from: "warehouses",
				localField: "vaccineVial.warehouseId",
				foreignField: "id",
				as: "warehouse",
			},
		},
		{ $unwind: "$warehouse" },
		{
			$lookup: {
				from: "organisations",
				localField: "warehouse.organisationId",
				foreignField: "id",
				as: "organisation",
			},
		},
		{ $unwind: "$organisation" },
		{ $sort: { createdAt: -1 } },
		{
			$facet: {
				paginatedResults: pagniationQuery,
				totalCount: [{ $count: "count" }],
			},
		},
		{ $unwind: "$totalCount" },
		{ $project: { paginatedResults: 1, totalCount: "$totalCount.count" } },
	]);

	let doses = [];
	let totalCount = 0;
	if (dosesResult && dosesResult?.length) {
		doses = dosesResult[0].paginatedResults;
		totalCount = dosesResult[0].totalCount;
	}

	const result = [];
	for (const element of doses) {
		let age = `${element.ageMonths ? element.ageMonths : element.age} ${element.ageMonths ? "months" : "years"
			}`;
		const data = {
			date: element.createdAt,
			batchNumber: element.vaccineVial.batchNumber,
			organisationName: element.product?.manufacturer,
			age: age,
			gender: req.t(element.gender),
			state: element.warehouse.warehouseAddress.state,
			city: element.warehouse.warehouseAddress.city,
			vaccinatedOrganisationName: element.organisation.name,
		};

		result.push(data);
	}

	return {
		totalCount: totalCount,
		result: result,
	};
};

exports.fetchBatchById = [
	auth,
	async (req, res) => {
		try {
			const userId = req.user.id;
			const batchNumber = req.body.batchNumber;
			const warehouseId = req.body.warehouseId;

			const user = await EmployeeModel.findOne({ id: userId });

			if (!user.warehouseId.includes(warehouseId)) {
				throw new Error("User does not have access to this warehouse!");
			}

			const warehouse = await WarehouseModel.findOne({ id: warehouseId });
			if (!warehouse) {
				throw new Error("Warehouse does not exist");
			}
			const productDetails = await EmployeeModel.aggregate(
				[
					{ $match: { id: userId } },
					{
						$lookup: {
							from: "atoms",
							let: {
								inventoryId: warehouse.warehouseInventory,
								batchNumber: batchNumber,
							},
							pipeline: [
								{
									$match: {
										$expr: {
											$and: [
												{ $eq: ["$currentInventory", "$$inventoryId"] },
												{ $eq: ["$status", "HEALTHY"] },
												{ $in: ["$$batchNumber", "$batchNumbers"] },
											],
										},
									},
								},
							],
							as: "atom",
						},
					},
					{ $unwind: "$atom" },
					{
						$lookup: {
							from: "products",
							localField: "atom.productId",
							foreignField: "id",
							as: "product",
						},
					},
					{ $unwind: "$product" },
					{ $project: { atom: 1, product: 1 } },
				],
				{ collation: { locale: "en", strength: 2 } },
			);
			let validBatches = [];
			if (productDetails) {
				if (productDetails?.length) {
					let errors = [];
					for (let i = 0; i < productDetails.length; ++i) {
						let currProd = productDetails[i];
						if (currProd?.atom?.attributeSet?.expDate) {
							let expDate = new Date(productDetails[0].atom.attributeSet.expDate);
							let today = new Date();
							today.setUTCHours(0, 0, 0, 0);

							if (expDate < today) {
								// if (expDate.toLocaleDateString() < today.toLocaleDateString()) {		
								errors.push("expired_batch");
								continue;
							} else {
								if (!currProd?.atom?.quantity) {
									errors.push("batch_exhausted");
									continue;
								}
								validBatches.push(currProd);
							}
						} else {
							errors.push("no_expiry_date");
						}
					}
					let priorityError;
					if (!validBatches.length) {
						if (errors.includes("batch_exhausted")) {
							priorityError = "Batch exhausted!";
						} else if (errors.includes("expired_batch")) {
							priorityError = "Batch expired!";
						} else {
							priorityError = "Batch has no expiry date!";
						}

						return apiResponse.validationErrorWithData(res, priorityError, batchNumber);
					}
				} else {
					const existingAtom = await AtomModel.findOne({
						currentInventory: warehouse.warehouseInventory,
						batchNumbers: batchNumber,
					});
					if (existingAtom)
						throw new Error("Batch exhausted!");
					else
						throw new Error("Batch not found in Warehouse !");
				}
			}

			return apiResponse.successResponseWithData(res, "Product Details", validBatches);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.fetchBatchByIdWithoutCondition = [
	auth,
	async (req, res) => {
		try {
			const userId = req.user.id;
			const batchNumber = req.body.batchNumber;
			const warehouseId = req.body.warehouseId;

			const user = await EmployeeModel.findOne({ id: userId });

			if (!user.warehouseId.includes(warehouseId)) {
				throw new Error("User does not have access to this warehouse!");
			}

			const warehouse = await WarehouseModel.findOne({ id: warehouseId });

			const productDetails = await EmployeeModel.aggregate(
				[
					{ $match: { id: userId } },
					{
						$lookup: {
							from: "atoms",
							let: {
								inventoryId: warehouse.warehouseInventory,
								batchNumber: batchNumber,
							},
							pipeline: [
								{
									$match: {
										$expr: {
											$and: [
												{ $eq: ["$currentInventory", "$$inventoryId"] },
												// { $eq: ["$status", "HEALTHY"] },
												{ $in: ["$$batchNumber", "$batchNumbers"] },
											],
										},
									},
								},
							],
							as: "atom",
						},
					},
					{ $unwind: "$atom" },
					{
						$lookup: {
							from: "products",
							localField: "atom.productId",
							foreignField: "id",
							as: "product",
						},
					},
					{ $unwind: "$product" },
					{ $project: { atom: 1, product: 1 } },
				],
				{ collation: { locale: "en", strength: 2 } },
			);
			return apiResponse.successResponseWithData(res, "Product Details", productDetails);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.vaccinateIndividual = [
	auth,
	async (req, res) => {
		try {
			const { warehouseId, productId, batchNumber, age, ageMonths, gender } = req.body;
			let vaccineVialId = req.body?.vaccineVialId;
			let vaccineVial;

			const warehouse = await WarehouseModel.findOne({ id: warehouseId });
			// Open a new bottle if first dose
			if (!vaccineVialId) {
				const existingInventory = await InventoryModel.findOne(
					{ id: warehouse.warehouseInventory },
					{ _id: 1, id: 1, inventoryDetails: { $elemMatch: { productId: productId } } },
				);
				if (existingInventory?.inventoryDetails?.length) {
					if (existingInventory.inventoryDetails[0].quantity < 1) {
						return apiResponse.ErrorResponse(res, "Inventory exhausted!");
					}
				}
				const existingAtom = await AtomModel.findOne({
					currentInventory: warehouse.warehouseInventory,
					batchNumbers: batchNumber,
					status: "HEALTHY",
				});
				if (!existingAtom?.quantity) {
					return apiResponse.ErrorResponse(res, "Batch Exhausted!");
				}
				const vaccineVialCounter = await CounterModel.findOneAndUpdate(
					{
						"counters.name": "vaccineVialId",
					},
					{
						$inc: {
							"counters.$.value": 1,
						},
					},
					{
						new: true,
					},
				);

				// Reduce inventory in AtomModel
				await AtomModel.updateOne(
					{
						currentInventory: warehouse.warehouseInventory,
						batchNumbers: batchNumber,
						status: "HEALTHY",
					},
					{
						$inc: { quantity: -1 },
					}
				);
				await AtomModel.updateMany(
					{
						quantity: 0
					},
					{ $set: { status: "CONSUMED" } }
				);
				// Reduce inventory in InventoryModel 
				await InventoryModel.updateOne(
					{ id: warehouse.warehouseInventory, "inventoryDetails.productId": productId },
					{ $inc: { "inventoryDetails.$.quantity": -1 } },
				);

				// Create an id
				vaccineVialId =
					vaccineVialCounter.counters[13].format + vaccineVialCounter.counters[13].value;

				// New vaccine vial
				vaccineVial = new VaccineVialModel({
					id: vaccineVialId,
					warehouseId: warehouseId,
					productId: productId,
					batchNumber: batchNumber,
					isComplete: false,
					numberOfDoses: 0,
				});
				await vaccineVial.save();
			} else {
				vaccineVial = await VaccineVialModel.findOne({ id: vaccineVialId });
				if (vaccineVial.numberOfDoses === 10) {
					throw new Error("Vial Exhausted! Only 10 doses per vial!");
				}
			}
			const doseCounter = await CounterModel.findOneAndUpdate(
				{
					"counters.name": "doseId",
				},
				{
					$inc: {
						"counters.$.value": 1,
					},
				},
				{
					new: true,
				},
			);
			// Create an id
			const doseId = doseCounter.counters[14].format + doseCounter.counters[14].value;
			const dose = new DoseModel({
				id: doseId,
				vaccineVialId: vaccineVialId,
				age: age || 0,
				ageMonths: ageMonths || 0,
				gender: gender === "GENERAL" ? "OTHERS" : gender.toUpperCase(),
				createdDateString: getDateStringForMongo(new Date()),
			});
			await dose.save();
			// Increment number of doses in VaccineVial model
			await VaccineVialModel.updateOne(
				{ id: vaccineVialId },
				{ $inc: { numberOfDoses: 1 } },
			);
			return apiResponse.successResponseWithData(res, "Dose added successfully!", {
				vaccineVialId,
				dose
			});
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.vaccinateMultiple = [
	auth,
	async (req, res) => {
		try {
			const { warehouseId, productId, batchNumber, doses } = req.body;
			let vaccineVialId = req.body?.vaccineVialId;
			let vaccineVial;
			const warehouse = await WarehouseModel.findOne({ id: warehouseId });
			// Open a new bottle if first dose
			if (!vaccineVialId) {
				const existingInventory = await InventoryModel.findOne(
					{ id: warehouse.warehouseInventory },
					{ _id: 1, id: 1, inventoryDetails: { $elemMatch: { productId: productId } } },
				);
				if (existingInventory?.inventoryDetails?.length) {
					if (existingInventory.inventoryDetails[0].quantity < 1) {
						return apiResponse.ErrorResponse(res, "Inventory exhausted!");
					}
				}
				const existingAtom = await AtomModel.findOne({
					currentInventory: warehouse.warehouseInventory,
					batchNumbers: batchNumber,
					status: "HEALTHY",
				});
				if (!existingAtom?.quantity) {
					return apiResponse.ErrorResponse(res, "Batch Exhausted!");
				}
				if (doses?.length && doses.length > 10) {
					throw new Error("Cannot vaccinate more than 10 people with a single vial!");
				}

				const vaccineVialCounter = await CounterModel.findOneAndUpdate(
					{
						"counters.name": "vaccineVialId",
					},
					{
						$inc: {
							"counters.$.value": 1,
						},
					},
					{
						new: true,
					},
				);

				// Create an id
				vaccineVialId =
					vaccineVialCounter.counters[13].format + vaccineVialCounter.counters[13].value;

				// New vaccine vial
				vaccineVial = new VaccineVialModel({
					id: vaccineVialId,
					warehouseId: warehouseId,
					productId: productId,
					batchNumber: batchNumber,
					isComplete: false,
					numberOfDoses: doses.length,
				});
				await vaccineVial.save();

				// Reduce inventory in InventoryModel and AtomModel
				await AtomModel.updateOne(
					{
						currentInventory: warehouse.warehouseInventory,
						batchNumbers: batchNumber,
						status: "HEALTHY",
					},
					{
						$inc: { quantity: -1 },
					}
				);

				await AtomModel.updateMany(
					{
						quantity: 0
					},
					{ $set: { status: "CONSUMED" } }
				);

				await InventoryModel.updateOne(
					{ id: warehouse.warehouseInventory, "inventoryDetails.productId": productId },
					{ $inc: { "inventoryDetails.$.quantity": -1 } },
				);
			} else {
				vaccineVial = await VaccineVialModel.findOne({ id: vaccineVialId });
				if (vaccineVial.numberOfDoses === 10) {
					throw new Error("Vial Exhausted! Only 10 doses per vial!");
				}
			}

			for (let i = 0; i < doses.length; ++i) {
				if (doses[i]?.id) {
					// eslint-disable-next-line no-unused-vars
					const update = (({ id, ...other }) => other)(doses[i]);
					await DoseModel.findOneAndUpdate({ id: doses[i].id }, {
						$set: update
					})
				} else {
					const doseCounter = await CounterModel.findOneAndUpdate(
						{
							"counters.name": "doseId",
						},
						{
							$inc: {
								"counters.$.value": 1,
							},
						},
						{
							new: true,
						},
					);
					// Create an id
					const doseId = doseCounter.counters[14].format + doseCounter.counters[14].value;

					const dose = new DoseModel({
						id: doseId,
						vaccineVialId: vaccineVialId,
						age: doses[i].age || 0,
						ageMonths: doses[i].ageMonths || 0,
						gender: doses[i].gender === "GENERAL" ? "OTHERS" : doses[i].gender.toUpperCase(),
						createdDateString: getDateStringForMongo(new Date()),
					});
					await dose.save();
				}
			}

			return apiResponse.successResponseWithData(res, "Multiple Doses added successfully!", {
				vaccineVialId: vaccineVialId,
			});
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getVaccinationDetailsByVial = [
	auth,
	async (req, res) => {
		try {
			const vaccineVialId = req.query.vaccineVialId;
			const vaccinationDetails = await VaccineVialModel.aggregate([
				{ $match: { id: vaccineVialId } },
				{
					$lookup: {
						from: "doses",
						localField: "id",
						foreignField: "vaccineVialId",
						as: "doses",
					},
				},
			]);

			if (vaccinationDetails?.length === 0) {
				return apiResponse.notFoundResponse(res, "VaccineVialId invalid!", {
					vaccineVialId: vaccineVialId,
				});
			}

			return apiResponse.successResponseWithData(
				res,
				"Fetched doses successfully!",
				vaccinationDetails,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getVaccinationDetailsByBatch = [
	auth,
	async (req, res) => {
		try {
			const batchNumber = req.query.batchNumber;
			const vaccinationDetails = await VaccineVialModel.aggregate([
				{ $match: { batchNumber: batchNumber } },
				{
					$lookup: {
						from: "doses",
						localField: "id",
						foreignField: "vaccineVialId",
						as: "doses",
					},
				},
				{
					$lookup: {
						from: "warehouses",
						localField: "warehouseId",
						foreignField: "id",
						as: "warehouse",
					},
				},
				{ $unwind: "$warehouse" },
				{
					$lookup: {
						from: "products",
						localField: "productId",
						foreignField: "id",
						as: "product",
					},
				},
				{ $unwind: "$product" },
			]);

			if (!vaccinationDetails) {
				return apiResponse.validationErrorWithData(res, "VaccineVialId invalid!", {
					vaccineVialId: vaccineVialId,
				});
			}

			return apiResponse.successResponseWithData(
				res,
				"Fetched doses successfully!",
				vaccinationDetails,
			);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getAllVaccinationDetails = [
	auth,
	async (req, res) => {
		try {
			const { gender, city, organisation, minAge, maxAge, ageType, today, skip, limit } = req.body;
			const user = req.user;

			const warehouseQuery = await buildWarehouseQuery(user, city, organisation);
			const warehouses = await WarehouseModel.aggregate([
				{ $match: warehouseQuery },
				{
					$lookup: {
						from: "vaccinevials",
						localField: "id",
						foreignField: "warehouseId",
						as: "vaccinations",
					},
				},
			]);

			let vaccineVialIds = warehouses.map((warehouse) => {
				let currVaccines = warehouse?.vaccinations?.map((vaccination) => vaccination.id);
				if (currVaccines && currVaccines.length) {
					return currVaccines;
				} else {
					return [];
				}
			});
			vaccineVialIds = vaccineVialIds.flat();

			const doseQuery = await buildDoseQuery(gender, minAge, maxAge, ageType, vaccineVialIds, today);
			const result = await generateVaccinationsList(doseQuery, req, skip, limit);

			return apiResponse.successResponseWithData(res, "Vaccinations list fetched!", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

// For GoverningBody
exports.getAnalyticsWithFilters = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const { city, organisation, gender, minAge, maxAge, ageType } = req.body;

			const warehouseQuery = await buildWarehouseQuery(user, city, organisation);
			const doseQuery = await buildDoseQuery(gender, minAge, maxAge, ageType);

			const warehouses = await WarehouseModel.aggregate([
				{ $match: warehouseQuery },
				{
					$lookup: {
						from: "vaccinevials",
						let: { warehouseId: "$id" },
						pipeline: [
							{ $match: { $expr: { $eq: ["$warehouseId", "$$warehouseId"] } } },
							{
								$lookup: {
									from: "products",
									localField: "productId",
									foreignField: "id",
									as: "product",
								},
							},
							{ $unwind: "$product" },
							{
								$lookup: {
									from: "doses",
									let: { vaccineVialId: "$id" },
									pipeline: [
										{
											$match: doseQuery,
										},
									],
									as: "doses",
								},
							},
						],
						as: "vaccinations",
					},
				},
			]);

			let totalVaccinations = 0;
			let todaysVaccinations = 0;
			let vialsUtilized = 0;
			let now = new Date();
			let nowString = getDateStringForMongo(now);

			for (let i = 0; i < warehouses.length; ++i) {
				const vaccineVials = warehouses[i].vaccinations;
				for (let j = 0; j < vaccineVials.length; ++j) {
					let createdAt = new Date(vaccineVials[j].createdAt);
					let createdAtString = getDateStringForMongo(createdAt);

					const doses = vaccineVials[j].doses;

					vialsUtilized++;

					if (doses.length) {
						totalVaccinations += doses.length;

						if (nowString === createdAtString) {
							todaysVaccinations += doses.length;
						}
					}
				}
			}

			const result = {
				todaysVaccinations: todaysVaccinations,
				totalVaccinations: totalVaccinations,
				unitsUtilized: vialsUtilized,
			};

			return apiResponse.successResponseWithData(res, "Fetched Analytcs With Filters!", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

// For pharmacies
exports.getAnalytics = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const userDetails = await EmployeeModel.findOne({ id: user.id });
			let warehouseIds = userDetails.warehouseId;
			let query = {};
			if (userDetails.role === "admin") {
				let warehouses = await WarehouseModel.find({
					organisationId: userDetails.organisationId,
					status: "ACTIVE",
				});
				warehouseIds = warehouses.map((warehouse) => warehouse.id);
			}
			const organisation = await OrganisationModel.findOne({
				id: userDetails.organisationId,
			});
			if (organisation.type !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const analytics = await VaccineVialModel.find(query);

			let totalVaccinations = 0;
			let todaysVaccinations = 0;
			let now = new Date();
			let nowString = getDateStringForMongo(now);

			for (let i = 0; i < analytics.length; ++i) {
				let createdAt = new Date(analytics[i].createdAt);
				let createdAtString = getDateStringForMongo(createdAt);

				totalVaccinations += analytics[i].numberOfDoses;

				if (nowString === createdAtString) {
					todaysVaccinations += analytics[i].numberOfDoses;
				}
			}

			let result = {
				unitsUtilized: analytics.length,
				totalVaccinations: totalVaccinations,
				todaysVaccinations: todaysVaccinations,
			};

			return apiResponse.successResponseWithData(res, "Analytics fetched successfully!", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getVialsUtilised = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const { city, organisation, skip, limit } = req.body;
			const warehouseQuery = await buildWarehouseQuery(user, city, organisation);
			const warehouses = await WarehouseModel.find(warehouseQuery);
			const warehouseIds = warehouses.map((warehouse) => warehouse.id);
			const pagniationQuery = [];
			if (skip) {
				pagniationQuery.push({ $skip: skip })
			}
			if (limit) {
				pagniationQuery.push({ $limit: limit });
			}
			const vialsResult = await VaccineVialModel.aggregate([
				{ $match: { warehouseId: { $in: warehouseIds } } },
				{ $sort: { createdAt: -1 } },
				{
					$facet: {
						paginatedResults: pagniationQuery,
						totalCount: [{ $count: "count" }],
					},
				},
				{ $unwind: "$totalCount" },
				{ $project: { paginatedResults: 1, totalCount: "$totalCount.count" } },
			]);

			let vialsUtilized = [];
			let totalCount = 0;
			if (vialsResult && vialsResult?.length) {
				vialsUtilized = vialsResult[0].paginatedResults;
				totalCount = vialsResult[0].totalCount;
			}

			const result = {
				vialsUtilized: vialsUtilized,
				totalCount: totalCount,
			};
			return apiResponse.successResponseWithData(res, "Vaccine Vial Details", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getVaccinationsList = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const { today, skip, limit } = req.body;

			const userDetails = await EmployeeModel.findOne({ id: user.id });
			let warehouseIds = userDetails.warehouseId;

			let query = {};
			if (userDetails.role === "admin") {
				let warehouses = await WarehouseModel.find({
					organisationId: userDetails.organisationId,
					status: "ACTIVE",
				});
				warehouseIds = warehouses.map((warehouse) => warehouse.id);
			}
			const organisation = await OrganisationModel.findOne({
				id: userDetails.organisationId,
			});
			if (organisation.type !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const vialsUtilized = await VaccineVialModel.find(query).sort({ _id: -1 });
			const vialsList = vialsUtilized.map((vial) => vial.id);

			let queryExprs = [{ $in: ["$vaccineVialId", vialsList] }];
			if (today) {
				let todayString = getDateStringForMongo(new Date());
				queryExprs.push({ $gte: ["$createdDateString", todayString] });
			}

			const pagniationQuery = [];
			if (skip) {
				pagniationQuery.push({ $skip: skip });
			}
			if (limit) {
				pagniationQuery.push({ $limit: limit });
			}
			const dosesResult = await DoseModel.aggregate([
				{
					$match: {
						$expr: {
							$and: queryExprs,
						},
					},
				},
				{
					$lookup: {
						from: "vaccinevials",
						localField: "vaccineVialId",
						foreignField: "id",
						as: "vaccineVial",
					},
				},
				{ $unwind: "$vaccineVial" },
				{ $sort: { createdAt: -1 } },
				{
					$facet: {
						paginatedResults: pagniationQuery,
						totalCount: [{ $count: "count" }],
					},
				},
				{ $unwind: "$totalCount" },
				{ $project: { paginatedResults: 1, totalCount: "$totalCount.count" } },
			]);

			let doses = [];
			let totalCount = 0;
			if (dosesResult && dosesResult?.length) {
				doses = dosesResult[0].paginatedResults;
				totalCount = dosesResult[0].totalCount;
			}

			const result = [];
			for (let i = 0; i < doses.length; ++i) {
				let age = `${doses[i].ageMonths ? doses[i].ageMonths : doses[i].age} ${doses[i].ageMonths ? "months" : "years"
					}`;
				const data = {
					date: doses[i].createdAt,
					batchNumber: doses[i].vaccineVial.batchNumber,
					age: age,
					gender: doses[i].gender,
				};

				result.push(data);
			}

			return apiResponse.successResponseWithData(res, "Vaccination list!", {
				totalCount: totalCount,
				vaccinationsList: result,
			});
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	}
]

exports.getVaccinationsListOld = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const userDetails = await EmployeeModel.findOne({ id: user.id });
			let warehouseIds = userDetails.warehouseId;
			let query = {};
			if (userDetails.role === "admin") {
				let warehouses = await WarehouseModel.find({
					organisationId: userDetails.organisationId,
					status: "ACTIVE",
				});
				warehouseIds = warehouses.map((warehouse) => warehouse.id);
			}
			const organisation = await OrganisationModel.findOne({
				id: userDetails.organisationId,
			});
			if (organisation.type !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const vialsUtilized = await VaccineVialModel.find(query).sort({ _id: -1 });

			const vaccinationsList = [];
			const todaysVaccinationsList = [];

			let now = new Date();
			let nowString = getDateStringForMongo(now);

			for (let i = 0; i < vialsUtilized.length; ++i) {
				let createdAt = new Date(vialsUtilized[i].createdAt);
				let createdAtString = getDateStringForMongo(createdAt);

				let currDoses = await DoseModel.aggregate([
					{ $match: { vaccineVialId: vialsUtilized[i].id } },
					{ $addFields: { batchNumber: vialsUtilized[i].batchNumber } },
				]);

				vaccinationsList.push(...currDoses);
				if (nowString === createdAtString) {
					todaysVaccinationsList.push(...currDoses);
				}
			}

			const result = {
				vaccinationsList: vaccinationsList,
				todaysVaccinationsList: todaysVaccinationsList,
			};

			return apiResponse.successResponseWithData(res, "Vaccine Vial Details", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getCitiesAndOrgsForFilters = [
	auth,
	async (req, res) => {
		try {
			const country = await CountryModel.aggregate([
				{ $match: { name: "Costa Rica" } },
				{
					$lookup: {
						from: "cities",
						let: { country_id: "$id" },
						pipeline: [
							{ $match: { $expr: { $eq: ["$country_id", "$$country_id"] } } },
							{ $group: { _id: null, uniqueCities: { $addToSet: "$name" } } },
						],
						as: "cities",
					},
				},
				{ $unwind: "$cities" },
			]);
			if (!country || !country.length) {
				throw new Error("Something went wrong!");
			}

			let cities = country[0]?.cities?.uniqueCities ? country[0].cities.uniqueCities : [];

			let orgs = await OrganisationModel.distinct("name", {
				type: { $in: ["PHARMACY", "Hospital"] },
			});
			orgs = orgs?.length ? orgs : [];

			const result = {
				cities: cities,
				organisations: orgs,
			};

			return apiResponse.successResponseWithData(res, "Cities and orgs for filters", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.getCitiesAndOrgsForFiltersOld = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const userDetails = await EmployeeModel.findOne({ id: user.id });
			let warehouseIds = userDetails.warehouseId;
			let query = {};

			if (userDetails.role === "admin") {
				let warehouses = await WarehouseModel.find({
					organisationId: userDetails.organisationId,
					status: "ACTIVE",
				});
				warehouseIds = warehouses.map((warehouse) => warehouse.id);
			}
			const organisation = await OrganisationModel.findOne({
				id: userDetails.organisationId,
			});
			if (organisation.type !== "GoverningBody") {
				query = { warehouseId: { $in: warehouseIds } };
			}

			const vaccinationCenters = await VaccineVialModel.aggregate([
				{ $match: query },
				{ $group: { _id: "$warehouseId" } },
			]);

			warehouseIds = vaccinationCenters.map((warehouse) => warehouse._id);

			const warehouses = await WarehouseModel.aggregate([
				{ $match: { id: { $in: warehouseIds } } },
				{ $group: { _id: "$warehouseAddress.city", orgs: { $addToSet: "$organisationId" } } },
			]);

			const cities = warehouses.map((warehouse) => warehouse._id);

			let orgs;
			if (organisation.type === "GoverningBody") {
				let orgIds = warehouses.map((warehouse) => warehouse.orgs);
				orgIds = orgIds.flat();

				orgs = await OrganisationModel.find({ id: { $in: orgIds } });
				orgs = orgs.map((org) => org.name);
			}

			const result = {
				cities: cities,
				organisations: orgs,
			};

			return apiResponse.successResponseWithData(res, "Cities and orgs for filters", result);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.exportVaccinationList = [
	auth,
	async (req, res) => {
		try {
			const { reportType, gender, city, organisation, minAge, maxAge, today, ageType } = req.body;
			const user = req.user;

			const warehouseQuery = await buildWarehouseQuery(user, city, organisation);
			const warehouses = await WarehouseModel.aggregate([
				{ $match: warehouseQuery },
				{
					$lookup: {
						from: "vaccinevials",
						localField: "id",
						foreignField: "warehouseId",
						as: "vaccinations",
					},
				},
			]);

			let vaccineVialIds = warehouses.map((warehouse) => {
				let currVaccines = warehouse?.vaccinations?.map((vaccination) => vaccination.id);
				if (currVaccines && currVaccines.length) {
					return currVaccines;
				} else {
					return [];
				}
			});
			vaccineVialIds = vaccineVialIds.flat();

			const doseQuery = await buildDoseQuery(gender, minAge, maxAge, ageType, vaccineVialIds, today);
			const result = await generateVaccinationsList(doseQuery, req);

			if (reportType === "excel") res = buildExcelReportDoses(req, res, result.result, today);
			else res = buildPdfReportDoses(req, res, result.result, today);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	},
];

exports.exportVialsUtilised = [
	auth,
	async (req, res) => {
		try {
			const user = req.user;
			const { city, organisation, reportType } = req.body;
			const warehouseQuery = await buildWarehouseQuery(user, city, organisation);
			const warehouses = await WarehouseModel.find(warehouseQuery);
			const warehouseIds = warehouses.map((warehouse) => warehouse.id);
			const vialsUtilized = await VaccineVialModel.aggregate([
				{ $match: { warehouseId: { $in: warehouseIds } } },
				{ $sort: { createdAt: -1 } },
			]);

			const fileData = [];
			for (let i = 0; i < vialsUtilized.length; ++i) {
				const data = {
					index: i + 1,
					date: vialsUtilized[i].createdAt,
					batchNumber: vialsUtilized[i].batchNumber,
					numberOfDoses: vialsUtilized[i].numberOfDoses,
				};
				fileData.push(data);
			}

			// Generate file
			if (reportType === "excel") res = buildExcelReportVials(req, res, fileData);
			else res = buildPdfReportVials(req, res, fileData);
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	}
]

exports.updateDose = [
	auth,
	async (req, res) => {
		try {
			const { doseId, update } = req.body;
			const updatedDose = await DoseModel.findOneAndUpdate({ id: doseId }, {
				$set: update
			}, { new: true })
			if (updatedDose) {
				return apiResponse.successResponseWithData(res, "Updated Dose", updatedDose)
			} else {
				return apiResponse.notFoundResponse(res, "Dose not found");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	}
]

exports.deleteDose = [
	auth,
	async (req, res) => {
		try {
			const { doseId } = req.query;
			const deleteDose = await DoseModel.findOneAndDelete({ id: doseId })
			if (deleteDose) {
				await VaccineVialModel.updateOne({ id: deleteDose.vaccineVialId }, { $inc: { numberOfDoses: -1 } })
				return apiResponse.successResponse(res, "Dose Deleted Successfully")
			} else {
				return apiResponse.notFoundResponse(res, "Dose not found");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err.message);
		}
	}
]

exports.completeVial = [
	auth,
	async (req, res) => {
		try {
			const { vaccineVialId } = req.body;
			const updatedVial = await VaccineVialModel.findOneAndUpdate({ id: vaccineVialId }, { $set: { isComplete: true } }, { new: true })
			if (updatedVial) {
				return apiResponse.successResponseWithData(res, "Vial Completed", updatedVial);
			} else {
				return apiResponse.notFoundResponse(res, "Vial Not Found");
			}
		} catch (err) {
			console.log(err);
			return apiResponse.errorResponse(res, err.message);
		}
	}
]

function buildExcelReportDoses(req, res, dataForExcel, today) {
	const styles = {
		headerDark: {
			font: {
				sz: 14,
				bold: true,
				underline: true,
			},
		},
	};

	const specification = {
		date: {
			displayName: req.t("date"),
			headerStyle: styles.headerDark,
			width: 120,
		},
		batchNumber: {
			displayName: req.t("batch_number"),
			headerStyle: styles.headerDark,
			width: 120,
		},
		organisationName: {
			displayName: req.t("manufacturer"),
			headerStyle: styles.headerDark,
			width: 220,
		},
		age: {
			displayName: req.t("age"),
			headerStyle: styles.headerDark,
			width: 60,
		},
		gender: {
			displayName: req.t("gender"),
			headerStyle: styles.headerDark,
			width: 120,
		},
		state: {
			displayName: req.t("state"),
			headerStyle: styles.headerDark,
			width: 220,
		},
		city: {
			displayName: req.t("city"),
			headerStyle: styles.headerDark,
			width: 220,
		},
		vaccinatedOrganisationName: {
			displayName: req.t("organization"),
			headerStyle: styles.headerDark,
			width: 220,
		}
	};

	const report = excel.buildExport([
		{
			name: today ? req.t("todays_vaccinations") : req.t("vaccinated_so_far"),
			specification: specification,
			data: dataForExcel,
		},
	]);

	res.attachment("VaccinationReport.xlsx");
	return res.send(report);
}

function buildPdfReportDoses(req, res, data, today) {
	const todaysDate = new Date();
	const rows = [];
	rows.push([
		{ text: req.t("date"), bold: true },
		{ text: req.t("batch_number"), bold: true },
		{ text: req.t("manufacturer"), bold: true },
		{ text: req.t("age"), bold: true },
		{ text: req.t("gender"), bold: true },
		{ text: req.t("state"), bold: true },
		{ text: req.t("city"), bold: true },
		{ text: req.t("organization"), bold: true },
	]);
	for (const element of data) {
		const date = element.date ? formatDate(new Date(element.date)) : "N/A";
		rows.push([
			date,
			element.batchNumber || "N/A",
			element.organisationName || "N/A",
			element.age || "N/A",
			element.gender || "N/A",
			element.state || "N/A",
			element.city || "N/A",
			element.vaccinatedOrganisationName || "N/A",
		]);
	}

	const docDefinition = {
		pageSize: "A4",
		pageOrientation: "landscape",
		pageMargins: [30, 30, 2, 2],
		content: [
			{
				text: today ? req.t("todays_vaccinations") + `(${formatDate(todaysDate)})` : req.t("vaccinated_so_far"),
				fontSize: 32,
				style: "header",
			},
			{
				table: {
					margin: [1, 1, 1, 1],
					headerRows: 1,
					headerStyle: "header",
					widths: [80, 80, 80, 50, 80, 110, 100, 120],
					body: rows,
				},
			},
		],
		styles: {
			header: {
				bold: true,
				margin: [10, 10, 10, 10],
			},
		},
	};

	const pdfDoc = printer.createPdfKitDocument(docDefinition, { fontLayoutCache: true });
	var temp123;
	const pdfFile = pdfDoc.pipe((temp123 = fs.createWriteStream("./VaccinationReport.pdf")));
	pdfDoc.end();
	temp123.on("finish", async function () { 		// send PDF file
		return res.sendFile(resolve(pdfFile.path));
	});
	return;
}

function buildExcelReportVials(req, res, dataForExcel) {
	const styles = {
		headerDark: {
			font: {
				sz: 14,
				bold: true,
				underline: true,
			},
		},
	};

	const specification = {
		index: {
			displayName: req.t("sr_no"),
			headerStyle: styles.headerDark,
			width: 60,
		},
		date: {
			displayName: req.t("date"),
			headerStyle: styles.headerDark,
			width: 120,
		},
		batchNumber: {
			displayName: req.t("batch_number"),
			headerStyle: styles.headerDark,
			width: 120,
		},
		numberOfDoses: {
			displayName: req.t("number_of_doses"),
			headerStyle: styles.headerDark,
			width: 120,
		}
	};

	const report = excel.buildExport([
		{
			name: req.t("vials_utilized_report"),
			specification: specification,
			data: dataForExcel,
		},
	]);

	res.attachment("VialsUtilizedReport.xlsx");
	return res.send(report);
}

function buildPdfReportVials(req, res, data) {
	const rows = [];
	rows.push([
		{ text: req.t("sr_no"), bold: true },
		{ text: req.t("date"), bold: true },
		{ text: req.t("batch_number"), bold: true },
		{ text: req.t("number_of_doses"), bold: true },
	]);
	for (let i = 0; i < data.length; i++) {
		const date = data[i].date ? new Date(data[i].date) : "";
		rows.push([
			data[i].index,
			formatDate(date),
			data[i].batchNumber || "N/A",
			data[i].numberOfDoses || "N/A",
		]);
	}

	const docDefinition = {
		pageSize: "A4",
		pageOrientation: "landscape",
		pageMargins: [30, 30, 2, 2],
		content: [
			{ text: req.t("vials_utilized_report"), fontSize: 32, style: "header" },
			{
				table: {
					margin: [1, 1, 1, 1],
					headerRows: 1,
					headerStyle: "header",
					widths: [80, 100, 150, 120],
					body: rows,
				},
			},
		],
		styles: {
			header: {
				bold: true,
				margin: [10, 10, 10, 10],
			},
		},
	};

	const pdfDoc = printer.createPdfKitDocument(docDefinition, { fontLayoutCache: true });
	var temp123;
	const pdfFile = pdfDoc.pipe((temp123 = fs.createWriteStream("./VialsUtilizedReport.pdf")));
	pdfDoc.end();
	temp123.on("finish", async function () { 		// send PDF file
		return res.sendFile(resolve(pdfFile.path));
	});
	return;
}

exports.addDateStringToDoses = [
	async (req, res) => {
		const allDoses = await DoseModel.find();
		let count = 0;
		for (let i = 0; i < allDoses.length; ++i) {
			let currDose = allDoses[i];
			let createdDateString = getDateStringForMongo(new Date(currDose.createdAt));
			await DoseModel.updateOne({ id: currDose.id }, { $set: { createdDateString: createdDateString } })
			++count;
		}
		return apiResponse.successResponseWithData(res, "Done", count)
	}
]