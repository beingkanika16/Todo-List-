/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import Paper from "@mui/material/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
let values = [];
let data = [];

export default function App() {
  const [tableData, setTableData] = React.useState("");
  const [addTableData, setAddedTableData] = React.useState([]);
  const [editData, setEditData] = React.useState(false);
  const [rows, setRows] = React.useState('');
  let data = [];

  const onChange = (value) => {
    setTableData(value);
    { editData && setRows(value) }
  };
  React.useEffect(() => {
    data = window.localStorage.getItem('tableDataValue');
	if(data && data.length)
{    data = JSON.parse(data)
    setAddedTableData(data);
}
  }, [])
  const addData = () => {
    values.push(tableData);
    window.localStorage.setItem("tableDataValue", JSON.stringify(values));
	setAddedTableData(values)
    setTableData("");
    setEditData(false);
  };
  const deleteData = (row) => {

	setAddedTableData(addTableData.filter((item) => item !== row));
	window.localStorage.removeItem(row);  };
  const edit = (row) => {
    setEditData(true);
    setTableData(row);
    setAddedTableData(addTableData.filter((item) => item !== row));

  };
  const save = (row) => {
    setEditData(true);
    values = addTableData.push(rows);
    window.localStorage.setItem("tableDataValue", JSON.stringify(addTableData));
    setTableData('');
    setEditData(false);
  };
  data = window.localStorage.getItem('tableDataValue');
  data = JSON.parse(data)
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const index = Array.prototype.indexOf.call(
        document.querySelectorAll("#todo"),
        event.target
      );
      if (document.querySelectorAll("#todo").length > index) {
        document.querySelectorAll("#todo")[index + 1].focus();
        event.preventDefault();
      }
    }
  };
  return (
    <Paper variant="outlined" square style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#f0f7ff' }}>
      <div className="App" style={{ margin: '2%' }}>
        <Typography variant="h4" component="h2" style={{ marginBottom: '6%' }}>
          To Do List
        </Typography>
        <TextField
          label="Enter Your Task"
          value={tableData}
          onKeyDown={(e) => handleEnter(e)}
          id="todo"
          onChange={(e) => onChange(e.target.value)}
        />
        <Button id="todo" onKeyDown={(e) => handleEnter(e)} style={{ marginLeft: '5%' }}
          variant="contained" size="medium" onClick={addData} disabled={!tableData}>
          ADD
        </Button>
        <TableContainer>
          {!editData && (
            <>
              <Table
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <TableBody>
                  {addTableData && addTableData
                    .map((row, index) => (
                      <TableRow key={row}>
                        {!editData && (
                          <TableCell
                            align="center"
                            style={{ fontWeight: "bold" }}
                          >
                            {row}
                          </TableCell>
                        )}

                        <TableCell>
                          <TableCell
                            align="center"
                            style={{ fontWeight: "bold" }}
                          >
                            <Button
                              variant="contained"
                              size="medium"
                              id="todo"
                              onKeyDown={(e) => handleEnter(e)}

                              onClick={() => deleteData(row)}
                            >
                              Delete
                            </Button>{" "}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontWeight: "bold" }}
                          >
                            <Button
                              variant="contained"
                              size="medium"
                              onClick={() => edit(row)}
                              onKeyDown={(e) => handleEnter(e)}
                              id="todo"
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableCell>

                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
        {editData && (
          <>
            <TableCell align="center" style={{ fontWeight: "bold" }}>

              <TextField
                label="Edit Task"
                value={tableData}
                id="todo"
                onKeyDown={(e) => handleEnter(e)}

                onChange={(e) => onChange(e.target.value)}
              />
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>

              <Button
                variant="contained"
                size="medium"
                onClick={save}

              >
                Save
              </Button>
            </TableCell>
          </>
        )}
      </div>
    </Paper>
  );
}
