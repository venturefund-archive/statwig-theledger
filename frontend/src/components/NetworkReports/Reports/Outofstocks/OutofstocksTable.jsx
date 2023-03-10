import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OutofstocksRow from "./OutofstocksRow";
import ReportFilter from "../../Filter/ReportFilter";
import { useTheme, styled } from "@mui/material/styles";

function TableHeader({
  anchorEl,
  value,
  pendingValue,
  setAnchorEl,
  setValue,
  setPendingValue,
  handleClick,
  handleClose,
  theme,
  labels,
}) {
  return (
    <TableRow>
      <TableCell>
        <div className="mi_report_table_head" onClick={handleClick}>
          <p className="mi-body-sm f-400 mi-reset grey-400">Product category</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
        <ReportFilter
          anchorEl={anchorEl}
          value={value}
          pendingValue={pendingValue}
          setAnchorEl={setAnchorEl}
          setValue={setValue}
          setPendingValue={setPendingValue}
          handleClick={handleClick}
          handleClose={handleClose}
          theme={theme}
          labels={labels}
        />
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head" onClick={handleClick}>
          <p className="mi-body-sm f-400 mi-reset grey-400">Product Name</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
        <ReportFilter
          anchorEl={anchorEl}
          value={value}
          pendingValue={pendingValue}
          setAnchorEl={setAnchorEl}
          setValue={setValue}
          setPendingValue={setPendingValue}
          handleClick={handleClick}
          handleClose={handleClose}
          theme={theme}
          labels={labels}
        />
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Manufacturer</p>
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
          <p className="mi-body-sm f-400 mi-reset grey-400">Location Details</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">No of Days</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function OutofstocksTable() {
  const rows = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState([labels[1], labels[11]]);
  const [pendingValue, setPendingValue] = React.useState([]);
  const theme = useTheme();

  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableHeader
            anchorEl={anchorEl}
            value={value}
            pendingValue={pendingValue}
            setAnchorEl={setAnchorEl}
            setValue={setValue}
            setPendingValue={setPendingValue}
            handleClick={handleClick}
            handleClose={handleClose}
            theme={theme}
            labels={labels}
          />
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <OutofstocksRow />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const labels = [
  {
    name: "1 Filter Option",
  },
  {
    name: "2 Filter Option",
  },
  {
    name: "3 Filter Option",
  },
  {
    name: "4 Filter Option",
  },
  {
    name: "5 Filter Option",
  },
  {
    name: "6 Filter Option",
  },
  {
    name: "7 Filter Option",
  },
  {
    name: "8 Filter Option",
  },
  {
    name: "9 Filter Option",
  },
  {
    name: "10 Filter Option",
  },
  {
    name: "11 Filter Option",
  },
  {
    name: "12 Filter Option",
  },
  {
    name: "13 Filter Option",
  },
  {
    name: "14 Filter Option",
  },
  {
    name: "15 Filter Option",
  },
  {
    name: "16 Filter Option",
  },
  {
    name: "17 Filter Option",
  },
  {
    name: "18 Filter Option",
  },
  {
    name: "19 Filter Option",
  },
  {
    name: "10 Filter Option",
  },
];
