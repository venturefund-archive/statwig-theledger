import React, { useEffect } from "react";
import "./Filterbar.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Autocomplete, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { getCitiesAndOrgsForFilters } from "../../../actions/lastMileActions";

function valuetext(value) {
	return `${value}°C`;
}

export default function Filterbar(props) {
	const { tableType, filters, setFilters, t, resetFilters } = props;

	const [cities, setCities] = useState([""]);
	const [organisations, setOrgnisations] = useState([""]);
	const [ageType, setAgeType] = useState("");

	const [yearRange, setYearRange] = useState([1, 150]);
	const [monthRange, setMonthRange] = useState([6, 11]);
	const [gender, setGender] = useState();
	const [city, setCity] = useState();
	const [organisation, setOrganisation] = useState();

	useEffect(() => {
		let data = {};
		if (ageType) {
			data.ageType = ageType;
			if (ageType === "months") {
				if (monthRange && monthRange.length) {
					data.minAge = monthRange[0];
					data.maxAge = monthRange[1];
				}
			} else {
				if (yearRange && yearRange.length) {
					data.minAge = yearRange[0];
					data.maxAge = yearRange[1];
				}
			}
		}

		if (gender) {
			data.gender = gender;
		}

		if (city && city !== "") {
			data.city = city;
		}

		if (organisation && organisation !== "") {
			data.organisation = organisation;
		}

		setFilters(data);
	}, [gender, monthRange, yearRange, city, organisation, ageType]);

	useEffect(async () => {
		if (tableType === "units") {
			if (filters.gender) {
				const { gender, minAge, maxAge, ...newFilters } = filters;
				setFilters(newFilters);
			}
		}
	}, [tableType]);

	useEffect(async () => {
		try {
			let result = await getCitiesAndOrgsForFilters();
			if (result?.data?.success) {
				setCities(result.data.data.cities);
				setOrgnisations(result.data.data.organisations);
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		// Reset filter values
		handleClear("city");
		handleClear("organisation");
		handleClear("gender");
		handleClear("age");
	}, [resetFilters]);

	const handleClear = (name) => {
		switch (name) {
			case "city": {
				setCity(null);
				break;
			}
			case "organisation": {
				setOrganisation(null);
				break;
			}
			case "gender": {
				setGender(null);
				break;
			}
			case "age": {
				setAgeType("");
				setMonthRange([6, 11]);
				setYearRange([1, 150]);
				break;
			}
		}
	};

	const handleMonthChange = (event, newValue) => {
		setMonthRange(newValue);
	};

	const handleYearChange = (event, newValue) => {
		setYearRange(newValue);
	};

	return (
		<section className="Filterbar--container">
			<div className="Filterbar--header">
				<h1 className="vl-subheading f-500 vl-black">{t("filter")}</h1>
			</div>
			<div className="Filterbar--body">
				{tableType !== "units" && (
					<div className="Filterbar--filterCard">
						<div className="filterCard-header">
							<div className="filterCard-inner-header">
								<p className="vl-body f-500 vl-grey-md">{t("gender")}</p>
								<button onClick={() => handleClear("gender")} className="filter-clear-btn">
									{t("clear")}
								</button>
							</div>
							<p className="vl-note f-400 vl-grey-xs">{t("gender_msg")}</p>
						</div>
						<div className="filterCard-body side-space border-btm">
							<FormControl>
								<RadioGroup
									className="mui-custom-radio-group"
									name="radio-buttons-group"
									onClick={(event) => setGender(event.target.value)}
								>
									<FormControlLabel
										name="gender"
										checked={gender === "MALE"}
										value="MALE"
										id="male"
										control={<Radio />}
										label={t("male")}
									/>
									<FormControlLabel
										name="gender"
										checked={gender === "FEMALE"}
										value="FEMALE"
										id="female"
										control={<Radio />}
										label={t("female")}
									/>
									<FormControlLabel
										name="gender"
										checked={gender === "OTHERS"}
										value="OTHERS"
										id="others"
										control={<Radio />}
										label={t("others")}
									/>
								</RadioGroup>
							</FormControl>
						</div>
					</div>
				)}
				<div className="Filterbar--filterCard">
					<div className="filterCard-header">
						<div className="filterCard-inner-header">
							<p className="vl-body f-500 vl-grey-md">{t("city")}</p>
							<button onClick={() => handleClear("city")} className="filter-clear-btn">
								Clear
							</button>
						</div>
						<p className="vl-note f-400 vl-grey-xs">{t("city_msg")}</p>
					</div>
					<div className="filterCard-body border-btm">
						<Autocomplete
							disablePortal
							fullWidth
							options={cities}
							value={typeof city === "string" ? cities.find((cty) => cty === city) : city || null}
							onChange={(event, value) => setCity(value)}
							renderInput={(params) => <TextField {...params} label={t("city")} />}
						/>
					</div>
				</div>

				{props.user?.type === "GoverningBody" && (
					<div className="Filterbar--filterCard">
						<div className="filterCard-header">
							<div className="filterCard-inner-header">
								<p className="vl-body f-500 vl-grey-md">{t("organisation")}</p>
								<button onClick={() => handleClear("organisation")} className="filter-clear-btn">
									Clear
								</button>
							</div>
							<p className="vl-note f-400 vl-grey-xs">{t("org_msg")}</p>
						</div>
						<div className="filterCard-body border-btm">
							<Autocomplete
								disablePortal
								fullWidth
								options={organisations}
								value={
									typeof organisation === "string"
										? organisations.find((org) => org === organisation)
										: organisation || null
								}
								onChange={(event, value) => setOrganisation(value)}
								renderInput={(params) => <TextField {...params} label="Organization" />}
							/>
						</div>
					</div>
				)}

				{tableType !== "units" && (
					<div className="Filterbar--filterCard">
						<div className="filterCard-header">
							<div className="filterCard-inner-header">
								<p className="vl-body f-500 vl-grey-md">{t("age")}</p>
								<button onClick={() => handleClear("age")} className="filter-clear-btn">
									{t("clear")}
								</button>
							</div>
							<p className="vl-note f-400 vl-grey-xs">{t("org_msg")}</p>
						</div>
						<div className="filterCard-body side-space">
							<FormControl>
								<RadioGroup
									className="mui-custom-radio-group"
									defaultValue="range"
									name="radio-buttons-group"
									value={ageType}
									onClick={(event) => setAgeType(event.target.value)}
								>
									<FormControlLabel
										checked={ageType === "months"}
										value="months"
										control={<Radio />}
										label={t("month_range")}
									/>
									<FormControlLabel
										checked={ageType === "years"}
										value="years"
										control={<Radio />}
										label={t("year_range")}
									/>
								</RadioGroup>
							</FormControl>
							{ageType === "months" ? (
								<div className="slider-select">
									<Slider
										getAriaLabel={() => "Temperature range"}
										value={monthRange}
										onChange={handleMonthChange}
										valueLabelDisplay="auto"
										getAriaValueText={valuetext}
										min={6}
										max={11}
									/>
								</div>
							) : (
								<div className="slider-select">
									<Slider
										getAriaLabel={() => "Temperature range"}
										value={yearRange}
										onChange={handleYearChange}
										valueLabelDisplay="auto"
										getAriaValueText={valuetext}
										min={1}
										max={150}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
