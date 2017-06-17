import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import { DateRangePicker } from 'react-dates'
import './Search.css'

const Typeahead = require('react-typeahead').Typeahead;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
      focusedInput: null,
      fromPlace: '',
      toPlace: '',
      airports: [{id: 'loading', value: 'Loading'}, {id: 'loading', value: 'bloadein'}]
    };
  }

  validateSearchFields() {
    return this.state.from !== null &&
      this.state.to !== null &&
      this.state.fromPlace !== '' &&
      this.state.toPlace !== '';
  }

  onPlaceSearch(keyword) {
    if (keyword.length < 3) {
      return;
    }

    this.props.store.lookUpForPlace(keyword)
      .then(response => {
        this.setState({
          airports: response.data
        });
      });
  }

  onSearchSubmit() {
    if (this.validateSearchFields()) {
      this.props.store.findFlights({
        fromPlace: this.state.fromPlace,
        toPlace: this.state.toPlace,
        from: this.state.from,
        to: this.state.to
      })
    }
  }

  render() {
    return(
      <div className="columns search-bar">
        <div className="column">
          <Typeahead
            options={this.state.airports}
            displayOption="value"
            filterOption="value"
            inputProps={{'className': 'input', 'placeholder': 'From'}}
            onOptionSelected={(item) => this.setState({fromPlace: item.id})}
            maxVisible={10}
            value={this.state.fromPlace}
            placeholder="From"
            onKeyUp={e => this.onPlaceSearch(e.currentTarget.value)}
          />
        </div>
        <div className="column">
          <Typeahead
            options={this.state.airports}
            displayOption="value"
            filterOption="value"
            inputProps={{'className': 'input', 'placeholder': 'From'}}
            onOptionSelected={(item) => this.setState({toPlace: item.id})}
            maxVisible={10}
            value={this.state.toPlace}
            placeholder="To"
            onKeyUp={e => this.onPlaceSearch(e.currentTarget.value)}
          />
        </div>
        <div className="column">
          <DateRangePicker
            startDate={this.state.from}
            endDate={this.state.to}
            onDatesChange={({ startDate, endDate }) => this.setState({ from: startDate, to: endDate })}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
        </div>
        <div className="column is-1 has-text-right">
          <button onClick={() => this.onSearchSubmit()} className="button is-primary"><i className="fa fa-search" /></button>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(Search))
