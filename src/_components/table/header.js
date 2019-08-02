import React,{Component} from 'react';

export default class Header extends Component {

    constructor(props) {
        super(props);
        const {columns} = props;
        this.initState = columns.reduce((obj,column)=>{
            switch(column.type) {
                case 'bool':
                    return {...obj, [column.name]: (column.initValue !== undefined)  ? column.initValue : true}
                case 'list':
                        return {...obj, [column.name]: (column.initValue !== undefined) ? column.initValue : column.options[0].value}
                case 'number':
                    return {...obj, [column.name]: (column.initValue !== undefined) ? column.initValue : 0}
                case 'text':
                    return {...obj, [column.name]: (column.initValue !== undefined) ? column.initValue : ''}
            }
        },{});
        this.state = this.initState;
    }
    
    changeHandler = (event) =>{
        const {target:{value,name,type,checked}} = event;
        if (type === 'checkbox') {
          this.setState({[name]: checked});
        } else {
          this.setState({[name]: value});
        }
    }

    onAdd = () =>{
        const id = new Date().getTime();
        this.props.addRow({...this.state, id});
        this.setState(this.initState);
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
                // <td><input
                //     type="text"
                //     name="username"
                //     value={this.state['username']}
                //     onChange={this.changeHandler}
                //     placeholder="Username" /><td>
                return <input
                            type={column.type}
                            name={column.name}
                            value={this.state[column.name]}
                            onChange={this.changeHandler}
                            placeholder={column.label}
                        />
        }
    }
    
    render() {
        const {columns} = this.props;
        const disabled = !columns.every(column => column.required ? this.state[column.name] : true )
        return <thead>
            <tr>
                {columns.map(column=><th key={column.name}>{column.label} {column.required ? '*' : ''}</th>)}
                <th>Action</th>
            </tr>
            <tr>
                {columns.map(column=><td key={column.name}>
                    {this.renderRow(column)}
                </td>)}
                <td>
                    <button disabled={disabled} onClick={this.onAdd}>Add</button>
                </td>
            </tr>
        </thead>;
    }
}
