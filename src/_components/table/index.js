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
        // this.onChangePage = this.onChangePage.bind(this);
    }
    user = false;
    first = false;
    last = false;
    sex = false;
    status = false;
    age = false;

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
    render() {
        const { rows, currentPage, addedRowInPage } = this.state;
        const { addRow, deleteRow, editRow, sort, props: { columns } } = this;
        const allRowsPerPage = currentPage * addedRowInPage;
        const indexOfFirstTodo = allRowsPerPage - addedRowInPage;
        const rowsPerPage = rows.slice(indexOfFirstTodo, allRowsPerPage);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(rows.length / addedRowInPage); i++) {
            pageNumbers.push(i);
        }

        return <> {/* <React.Fragment> */}
            <h1>Editable Table</h1>
            <table>
                <Header
                    columns={columns}
                    addRow={addRow}
                    sort={sort}
                />
                <tbody>
                    {rowsPerPage.map((row, index) => {
                        return <Row key={row.id} row={row} columns={columns} onDelete={deleteRow(row.id)} onEdit={editRow} />
                    })}
                </tbody>
            </table>
            <div>
                <ul className="pageNumber">
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