import React, { Component } from 'react'
import { observer, Provider } from 'mobx-react'
import Store from './stores/store'

import Search from './components/Search'
import Results from './components/Results'
import Loading from './components/Loading'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <div className="App">
          <Search/>
          <Results/>
          <Loading/>
        </div>
      </Provider>
    );
  }
}

export default observer(App);
