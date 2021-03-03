import React, { Component } from 'react';
import './App.css';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import TableSearch from './TableSearch/TableSearch';

export default class App extends Component {

  state = {
    isLoading: true,
    data: [],
    sort: 'asc',
    sortField: 'id',
    currentPage: 0
  }

  async componentDidMount() {
    const response = await fetch(`http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`);
    const data = await response.json();

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = sortField => {

    const cloneData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(cloneData, sortField, sortType);

    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })
  }


  pageChangeHandler = ({ selected }) => (
    this.setState({ currentPage: selected })
  )

  render() {
    const pageSize = 50;
    const displayData = _.chunk(this.state.data, pageSize)[this.state.currentPage]
    return (
      <div className="container">
        {
          this.state.isLoading
            ? <Loader />
            : <React.Fragment>
              <TableSearch/>
              <Table
                data={displayData}
                onSort={this.onSort}
                sort={this.state.sort}
                sortField={this.state.sortField} />
            </React.Fragment>


        }
        {
          this.state.data.length > pageSize
            ? <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={20}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.pageChangeHandler}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              forcePage={this.state.currentPage}
            /> : null
        }

      </div>
    );
  }

}


