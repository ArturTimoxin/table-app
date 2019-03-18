import React, { Component } from "react";
import { Table, Icon, Button, Input, Checkbox } from "semantic-ui-react";
import "./style/style.css";
let nextID = 4;
class App extends Component {
  state = {
    table: [
      { row: [1, "first", "title1", true], isEdit: false },
      { row: [2, "second", "title2", false], isEdit: false },
      { row: [3, "third", "title3", true], isEdit: false },
    ],
    name: "",
    title: "",
    error: "",
  };

  changeInput = e => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  addRow = e => {
    // trim() - delete spases in string
    if (this.state.name.trim() && this.state.title.trim()) {
      if (this.state.name.length < 30 && this.state.title.length < 30) {
        let status = document.getElementById("status").checked;
        let newRow = { row: [nextID++, this.state.name, this.state.title, status], isEdit: false };
        let newTable = this.state.table;
        newTable.push(newRow);
        this.setState({ table: newTable });
      } else {
        this.setState({ error: "Text length in fields must not exceed 30 characters." });
      }
    } else {
      this.setState({ error: "Fill in all the fields" });
    }
  };

  deleteRow = e => {
    let newTable = this.state.table.filter(elem => elem.row[0] !== Number(e.target.id));
    this.setState({ table: newTable });
  };

  toggleEditRow = e => {
    let newTable = this.state.table;
    let idRowInArray = newTable.findIndex(element => element.row[0] === Number(e.target.id));
    newTable[idRowInArray].isEdit = !newTable[idRowInArray].isEdit;
    this.setState({ table: newTable });
  };

  saveChanges = e => {
    let newTable = this.state.table;
    let idRowInArray = newTable.findIndex(element => element.row[0] === Number(e.target.id));
    let newValueName =
      document.getElementById(`inputEditName${Number(e.target.id)}`).value !== ""
        ? document.getElementById(`inputEditName${Number(e.target.id)}`).value
        : newTable[idRowInArray].row[1];
    let newValueTitle =
      document.getElementById(`inputEditTitle${Number(e.target.id)}`).value !== ""
        ? document.getElementById(`inputEditTitle${Number(e.target.id)}`).value
        : newTable[idRowInArray].row[2];
    let newValueStatus = document.getElementById(`checkboxEditStatus${Number(e.target.id)}`).checked;
    newTable[idRowInArray] = {
      row: [Number(e.target.id), newValueName, newValueTitle, newValueStatus],
      isEdit: false,
    };
    this.setState({ table: newTable });
  };

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="titleEditForm">Table App</div>
          <div className="tableEditForm">
            <Input placeholder="Name" name="name" value={this.state.name} onChange={this.changeInput} />

            <Input placeholder="Title" name="title" value={this.state.title} onChange={this.changeInput} />

            <Checkbox label="Status" name="status" id="status" />

            <Button color="green" onClick={this.addRow}>
              Add
            </Button>
          </div>
          <div className="error">{this.state.error}</div>
          <div className="table">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                  <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                  <Table.HeaderCell width={5}>Title</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Status</Table.HeaderCell>
                  <Table.HeaderCell width={6}>Controll</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.table.map((obj, i) => {
                  if (obj.isEdit) {
                    return (
                      <Table.Row key={i}>
                        <Table.Cell>{obj.row[0]}</Table.Cell>
                        <Table.Cell>
                          <Input id={`inputEditName${obj.row[0]}`} defaultValue={obj.row[1]} />
                        </Table.Cell>
                        <Table.Cell>
                          <Input id={`inputEditTitle${obj.row[0]}`} defaultValue={obj.row[2]} />
                        </Table.Cell>
                        <Table.Cell>
                          <Checkbox id={`checkboxEditStatus${obj.row[0]}`} defaultChecked={obj.row[3]} />
                        </Table.Cell>
                        <Table.Cell>
                          <Button id={obj.row[0]} color="green" onClick={this.saveChanges}>
                            Save
                          </Button>
                          <Button id={obj.row[0]} color="red" onClick={this.toggleEditRow}>
                            Cansel
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  } else {
                    return (
                      <Table.Row key={i}>
                        {obj.row.map((cell, j) => {
                          if (typeof cell !== "boolean") {
                            return <Table.Cell key={j}>{cell}</Table.Cell>;
                          } else if (cell) {
                            return (
                              <Table.Cell key={j}>
                                <Icon color="green" name="checkmark" size="large" />
                              </Table.Cell>
                            );
                          } else {
                            return (
                              <Table.Cell key={j}>
                                <Icon color="red" name="cancel" size="large" />
                              </Table.Cell>
                            );
                          }
                        })}
                        <Table.Cell>
                          <Button id={obj.row[0]} onClick={this.toggleEditRow}>
                            Edit
                          </Button>
                          <Button id={obj.row[0]} color="red" onClick={this.deleteRow}>
                            Delete
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
