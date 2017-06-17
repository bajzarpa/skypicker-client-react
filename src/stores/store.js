import { action, extendObservable } from 'mobx'
import moment from 'moment'
import axios from 'axios'

// eslint-disable-next-line
import $ from 'jquery' // for the toastr :((
import toastr from 'toastr'

class Store {
  constructor() {
    extendObservable(this, {
      keyword: '',
      params: {},
      flights: [],
      loading: false
    });
  }

  lookUpForPlace = action((keyword) => {
    return axios.get(`https://api.skypicker.com/places?term=${keyword}&v=2&locale=en`)
  });

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
      .then(result => {
        this.loading = false;
        this.flights = result.data
      })
      .catch(error => toastr.error('There were an error while communicating with server. Please try again later'))
  });

}

const places = new Store();
export default places;