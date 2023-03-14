import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BestsellerRow from "./BestsellerRow";
import { useTranslation } from "react-i18next";
import { getBestSellers } from "../../../../actions/networkActions";

function TableHeader() {
  return (
    <TableRow>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Product category</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Product Name</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Manufacturer</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">No of Units Sold</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">
            Organization Name
          </p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Address</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function BestsellerTable() {
  const [bestseller, setBestseller] = useState([]);
  const [bestsellerFilters, setBestsellerFilters] = useState();
	const [reportWarehouse, setReportWarehouse] = useState("");

  const { t } = useTranslation();

  const getBestsellers = async () => {
		const bestSellers = await getBestSellers(reportWarehouse);
		if (bestSellers) setBestseller(bestSellers.data.bestSellers);
	};

  useEffect(() => {
		getBestsellers();
		// getexpiredStockFilters();
  }, []);
  
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableHeader />
        </TableHead>
        <TableBody>
          {bestseller.map((product, index) => (
            <BestsellerRow t={t} product={product} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
