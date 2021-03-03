import React, { Component } from 'react';
import './App.css';
import Loader from './Loader/Loader';
import Table from './Table/Table';

export default class App extends Component {

  state = {
    isLoading: true,
    data: []
  }

  async componentDidMount() {
    const response = await fetch(`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`);
    const data = await response.json();
    // console.log(data);
    this.setState({
      isLoading: false,
      data
    })
  }

  render() {
    return (
      <div className="container">
        {
          this.state.isLoading ? <Loader /> : <Table data={this.state.data} />
        }

      </div>
    );
  }

}


