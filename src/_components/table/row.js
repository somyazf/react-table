import React,{Component} from 'react';

export default class Row extends Component {

    state = {
        isEdit: false
    }

    editRow = () => {
        if (this.state.isEdit) {
            this.props.onEdit(this.state);
            this.setState({isEdit:false});
        } else {
            this.setState({isEdit: true,...this.props.row});
        }
    }


    renderRow = (column) =>{
        switch(column.type) {
            case 'bool':
                    return <input
                        type="checkbox"
                        name={column.name}
                        checked={this.state[column.name]}
                        onChange={this.changeHandler}
                        placeholder={column.label}
                    />
            case 'list':
                return <select name={column.name} onChange={this.changeHandler}>
                        {column.options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
            default:
                return <input
                            type={column.type}
                            name={column.name}
                            value={this.state[column.name]}
                            onChange={this.changeHandler}
                            placeholder={column.label}
                        />
        }
    }


    renderEdit() {
        return this.props.columns.map(column=><td key={column.name}>
            {this.renderRow(column)}
        </td>)
    }

    changeHandler = (event) =>{
        const {target:{value,name,type,checked}} = event;
        if (type === 'checkbox') {
          this.setState({[name]: checked});
        } else {
          this.setState({[name]: value});
        }
    }

    render() {
        const {row,onDelete,columns} = this.props;
        const {isEdit} = this.state
        return <>
            <tr>
            {isEdit ? this.renderEdit() : columns.map(column=>{
                switch(column.type){
                    case 'bool':
                        return <td key={column.name}>{column[row[column.name]]}</td>;
                    case 'list':
                        return <td key={column.name}>{column.options.find(option=>option.value === row[column.name]).label}</td>
                    default:
                        return <td key={column.name}>{row[column.name]}</td>;
                }
            })}
            <td>
                <button onClick={this.editRow}>{isEdit ? 'Save' : 'Edit'}</button>
                {!isEdit && <button onClick={onDelete}>Delete</button>}
            </td>
        </tr>
        </>
    }
}