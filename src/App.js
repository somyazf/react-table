import React,{Component} from 'react';
import Table from "./_components/table/index";
import './App.css';

class App extends Component {
  
  render() {
    const columns = [
      {name: 'username', label: 'UserName', type: 'text',required: true},
      {name: 'firstName', label: 'First Name', type: 'text',required: true},
      {name: 'lastName', label: 'Last Name', type: 'text'},
      {name: 'sex', label: 'Sex', type: 'bool', true: 'Male', false: 'Female', initValue: false},
      {name: 'age', label: 'Age', type: 'number'},
      {name: 'status', label: 'Status', type: 'list', options: [
        {value: '0', label: 'Active'},
        {value: '1', label: 'Deactive'},
        {value: '2', label: 'Suspend'},
      ],required: true},
    ]
    return  <Table columns={columns}/>;
  }
}

export default App;
