import React,{Component} from 'react';
import Header from './header';
import Row from './row';

export default class Table extends Component {
    state = {
        rows: []
    }
    
    addRow = row =>{
        const {rows} = this.state;
        this.setState({rows: [...rows, row]})
    }

    deleteRow = id => (a) =>{
        const {rows} = this.state;
        rows.splice(rows.findIndex(row=>row.id === id),1);
        this.setState({rows});
    }

    editRow = row =>{
        const {rows} = this.state;
        rows[rows.findIndex(_row=> _row.id === row.id)] = row;
        this.setState({rows});
    }

    render() {
        const {rows} = this.state;
        const {addRow,deleteRow,editRow,props:{columns}} = this;
        return <> {/* <React.Fragment> */}
          <h1>Editable Table</h1>
          <table>
            <Header
                columns={columns}
                addRow={addRow}
            />
            <tbody>
              {rows.map(row=><Row key={row.id} row={row} columns={columns} onDelete={deleteRow(row.id)} onEdit={editRow} />)}
            </tbody>
          </table>
        </>;
    }
}