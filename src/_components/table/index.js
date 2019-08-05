import React, { Component } from 'react';
import Header from './header';
import Row from './row';


export default class Table extends Component {

    constructor() {
        super();
        this.state = {
            rows: [],
            currentPage: 1,
            addedRowInPage: 3
        };
    }
    userName = false;
    fistName = false;
    lastName = false;
    sex = false;
    age = false;
    status = false;

    onChangePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    addRow = row => {
        const { rows } = this.state;
        this.setState({ rows: [...rows, row] })
    }

    deleteRow = id => (a) => {
        const { rows } = this.state;
        rows.splice(rows.findIndex(row => row.id === id), 1);
        this.setState({ rows });
    }

    editRow = row => {
        const { rows } = this.state;
        rows[rows.findIndex(_row => _row.id === row.id)] = row;
        this.setState({ rows });
    }

    onSort = (event) => {
        const {id} = event.target;
        const {rows} = this.state;
        // const {columns} = this.props;
        let sorted = [];
        if (id === 'username') {
            if (this.userName) {
                sorted = rows.sort((a, b) => a.username > b.username ? -1 : 1);
                this.userName = false;
            }else {
                sorted = rows.sort((a, b) => a.username > b.username ? 1 : -1);
                this.userName = true;
            }
        }

        if (id === 'firstName') {
            if (this.fistName) {
                sorted = rows.sort((a, b) => a.firstName > b.firstName ? -1 : 1);
                this.fistName = false;
            }else {
                sorted = rows.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
                this.fistName = true;
            }
        }

        if (id === 'lastName') {
            if (this.lastName) {
                sorted = rows.sort((a, b) => a.lastName > b.lastName ? -1 : 1);
                this.lastName = false;
            }else {
                sorted = rows.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
                this.lastName = true;
            }
        }

        if (id === 'sex') {
            if (this.sex) {
                sorted = rows.sort((a, b) => a.sex > b.sex ? -1 : 1);
                this.sex = false;
            }else {
                sorted = rows.sort((a, b) => a.sex > b.sex ? 1 : -1);
                this.sex = true;
            }
        }

        if (id === 'status') {
            if (this.status) {
                sorted = rows.sort((a, b) => a.status > b.status ? -1 : 1);
                this.status = false;
            }else {
                sorted = rows.sort((a, b) => a.status > b.status ? 1 : -1);
                this.status = true;
            }
        }

        if (id === 'age') {
            if (this.age) {
                sorted = rows.sort((a, b) => +a.age > +b.age ? -1 : 1);
                this.age = false;
            }
            else {
                sorted = rows.sort((a, b) => +a.age > b.age ? 1 : -1);
                this.age = true;
            }
        }
        this.setState({
            rows: [...sorted]
        })
    }

    render() {
        const { rows, currentPage, addedRowInPage } = this.state;
        const { addRow, deleteRow, editRow, onSort, props: { columns } } = this;
        const lastRowToSlice = currentPage * addedRowInPage;
        const firstRowToSlice = lastRowToSlice - addedRowInPage;
        const rowsPerPage = rows.slice(firstRowToSlice, lastRowToSlice);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(rows.length / addedRowInPage); i++) {
            pageNumbers.push(i);
        }

        return <>
            <h1>Editable Table</h1>
            <table>
                <Header
                    columns={columns}
                    addRow={addRow}
                    onSort={onSort}
                />
                <tbody>
                    {rowsPerPage.map((row, index) => {
                        return <Row key={row.id} row={row} columns={columns} onDelete={deleteRow(row.id)} onEdit={editRow} />
                    })}
                </tbody>
            </table>
            <div className="page-number">
                <ul>
                    {pageNumbers.map(number => {
                        return (
                            <li
                                key={number}
                                id={number}
                                onClick={this.onChangePage}
                            >
                                {number}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>;
    }
}