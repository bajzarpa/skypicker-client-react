import React, { Component } from 'react'
import moment from 'moment'
import './Result.css'

class Result extends Component {
  makeAirlineLogos(airlines) {
    let url = '';

    return airlines.map((airline, index) => {
      url = `http://pics.avs.io/100/50/${airline}.png`;

      return (
        <div className="card-footer-item" key={index}>
          <img src={url} alt={airline}/>
        </div>
      )
    });
  }

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
          <div className="card-footer">
            {this.makeAirlineLogos(this.props.data.airlines)}
          </div>
        </div>
      </div>
    )
  }
}

export default Result;