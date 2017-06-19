import { action, extendObservable } from 'mobx'
import moment from 'moment'
import axios from 'axios'

// eslint-disable-next-line
import $ from 'jquery' // for the toastr :((
import toastr from 'toastr'

class Store {
  constructor() {
    extendObservable(this, {
      params: {},
      flights: [],
      loading: false
    });
  }

  /**
   * @description Get the list of airports or counties by keyword
   * @param {String} keyword
   * @returns {Object<Promise>}
   */
  lookUpForPlace = action((keyword) => {
    return axios.get(`https://api.skypicker.com/places?term=${keyword}&v=2&locale=en`)
  });

  /**
   * @description Get the available flights from the SkyPicker's API
   * @param {Object}  params            - Search parameters object
   * @param {String}  params.fromPlace  - The id of the selected departure airport
   * @param {String}  params.toPlace    - The id of the selected arrival airport
   * @param {Date}    params.from       - Departure time
   * @param {Date}    params.to         - Departure time
   */
  findFlights = action((params) => {
    this.loading = true;
    const from = moment(params.from).format('DD/MM/YYYY');
    const to = moment(params.to).format('DD/MM/YYYY');

    axios.get('https://api.skypicker.com/flights', {
      params: {
        locale: 'en',
        typeFlight: 'return',
        v: 2,
        flyFrom: params.fromPlace,
        to: params.toPlace,
        dateFrom: from,
        dateTo: from,
        returnFrom: to,
        returnTo: to
      }
    })
      .then(result => this._onResponseSuccess(result))
      .catch(error => Store._onResponseError(error))
  });

  /**
   * @description When the request was successful set the data
   *              into our model and then broadcast that for subscribers
   * @param {Object} result - API response
   * @private
   */
  _onResponseSuccess(result) {
    this.loading = false;
    this.flights = result.data
  }

  static _onResponseError(error) {
    toastr.error('There were an error while communicating with server. Please try again later')
  }

}

const places = new Store();
export default places;