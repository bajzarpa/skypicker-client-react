import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import './Loading.css'

class Loading extends Component {
  render() {
    return (
      <div className="loading-screen" style={{display: this.props.store.loading ? 'block': 'none'}}>
        <i className="fa fa-refresh fa-spin fa-3x fa-fw" />
      </div>
    )
  }
}

export default inject('store')(observer(Loading))