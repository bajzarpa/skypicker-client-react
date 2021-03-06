import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Result from '../Result'
import './Results.css'

class Results extends Component {
  render() {
    let resultsContent = '';
    let isDataPresent = this.props.store.flights.data && this.props.store.flights.data.length;
    let isDataPresentWithoutResults = this.props.store.flights.data && this.props.store.flights._results === 0;

    if (isDataPresent) {
      resultsContent = this.props.store.flights.data.map((item, key) => (
        <Result data={item} key={key} />
      ))
    } else if (isDataPresentWithoutResults) {
      resultsContent = (<p className="column is-12 has-text-centered">No results found for your criteria.</p>);
    }

    return (
      <div className="columns is-multiline result-list">
        <h1 className="title column is-12">Search results</h1>
        {resultsContent}
      </div>
    )
  }
}

export default inject('store')(observer(Results))