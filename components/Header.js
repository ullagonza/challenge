import React, { Component } from 'react'
import Head from '../components/Head'

class Header extends Component {
  render () {
    return ( 
      <header className="header">
      <div>
          <div className="header__logo">
            <img src="./static/img/logo.svg" alt="Aerolab" />
          </div>
          <div className="header__user">
              <div className="header__user__name">{this.props.name}</div>
              <div id="counterContainer" className="header__user__points">
                <div id="counter">{this.props.points}</div>
                <div><img src="./static/img/coin.svg" alt="Points"/></div>
              </div>
          </div>
      </div>
    </header>
    )
  }
}

export default Header
