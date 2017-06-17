import React, { Component } from 'react'
import moment from 'moment'
import './Result.css'

class Result extends Component {
  render() {
    return (
      <div className="column is-4 search-result">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {this.props.data.cityFrom} ({this.props.data.flyFrom})
              <i className="fa fa-long-arrow-right"/>
              {this.props.data.cityTo} ({this.props.data.flyTo})
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <div><i className="fa fa-clock-o" /> {this.props.data.fly_duration}</div>
              <div><i className="fa fa-eur" /> {this.props.data.price}</div>
              <hr/>
              <div>Departure: {moment.unix(this.props.data.dTime).format('YYYY-MM-DD H:m')}</div>
              <div>Arrival: {moment.unix(this.props.data.aTime).format('YYYY-MM-DD H:m')}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Result;