import React, { Component } from 'react'
import LazyLoad from 'react-lazy-load';
import Header from '../components/Header'
import Link from 'next/link'
import {TweenLite} from 'gsap'
class Products extends Component {
  constructor (props) {
    super(props)
    this.redeem = this.redeem.bind(this);
    this.sortMostRecent = this.sortMostRecent.bind(this);
    this.sortLowestCost = this.sortLowestCost.bind(this);
    this.sortHighestCost = this.sortHighestCost.bind(this);
    this.state = {
     buttonPressed1: false,
     buttonPressed2: false,
     buttonPressed3: false,
     currentCost: 0, 
     isTop: true,
     loading: true,
     isLowestPrice: false,
     isHigherPrice: false,
     isProductsOriginal: false,
     'products': [],
    }
  }

  async componentDidMount() {
    const response = await fetch('https://coding-challenge-api.aerolab.co/products', {
         headers: new Headers({
         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDFkMmY4NzM2ZjEyNTAwNmZmOWIzZTAiLCJpYXQiOjE1NjIxOTM3OTl9.QaUDZ3qJA5FMwz0ThhGWoIxJ8pFpZv9I00XZM40PORc",
      })
    })
    const data = await response.json();
    this.setState({ 'products': data, loading: false });
    // Detect when scrolled through banner
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < document.getElementById('banner').offsetHeight;
      if (isTop !== this.state.isTop) {
          this.setState({ isTop })
      }
    });
 
  };
  //Sort products from most recent creation date
  sortMostRecent () {
    const {products} = this.state
    let newProducts = products
    if (! this.state.isLowestPrice) {
      newProducts = products.sort((a, b) => a._id.localeCompare(b._id))
    }
    this.setState({
      products: newProducts
    });
    this.setState({
      buttonPressed1: true,
      buttonPressed2: false,
      buttonPressed3: false
    });
    //Scroll top
    let element = document.getElementById("label");
    var headerOffset = 290;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
  };

  //Sort products from lowest cost to highest
  sortLowestCost () {
    const {products} = this.state
    let newProducts = products
    if (! this.state.isLowestPrice) {
      newProducts = products.sort((a, b) => a.cost - b.cost)
    }
    this.setState({
      products: newProducts
    });
    this.setState({
      buttonPressed1: false,
      buttonPressed2: true,
      buttonPressed3: false
    });
    //Scroll top
    let element = document.getElementById("label");
    var headerOffset = 290;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
  };
  
  //Sort products from highest cost to lowest
  sortHighestCost () {
    const {products} = this.state
    let newProducts = products
    if (! this.state.isLowestPrice) {
      newProducts = products.sort((a, b) => b.cost - a.cost)
    }
    this.setState({
      products: newProducts
    });
    this.setState({
      buttonPressed1: false,
      buttonPressed2: false,
      buttonPressed3: true
    });
    //Scroll top
    let element = document.getElementById("label");
    var headerOffset = 290;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
    
  };
  
  //revealLabel
  showLabel (product, cost) {
    document.getElementById("product").innerHTML = product;
    document.getElementById("cost").innerHTML = cost;
    document.getElementById('label').classList.add('label--show');
    //Updates current product cost
    this.setState({
      currentCost: cost
    });
  };
   //RemoveLabel
   removeLabel () {
    document.getElementById('label').classList.remove('label--show');
  };
  
  redeem (){
    if(( (this.props.points) - (this.state.currentCost)) >=0){
      document.getElementById('label').classList.add('label--show');
      this.removeLabel()
      
      //Apply countdown in GSAP
      var Cont={val:(this.props.points)} , NewVal = ((this.props.points) - (this.state.currentCost)) ;
      TweenLite.to(Cont,2 ,{val:NewVal,roundProps:"val",onUpdate:function(){
        document.getElementById("counter").innerHTML=Cont.val
      }});
      TweenLite.to('#counterContainer', 2, { background: "linear-gradient(#25BBF1, #0AD4FA)", ease: Power3.easeIn });
      TweenLite.to('#counter', 0, { color: "#fff", ease: Power3.easeIn });
      TweenLite.to('#counterContainer', 2, {delay:2, background: "#EDEDED", ease: Power3.easeIn });
      TweenLite.to('#counter', 0, { delay:2,color: "#616161", ease: Power3.easeIn });

      this.props.action((this.props.points) - (this.state.currentCost))
    }
  };
  
  render () {
    //Redeem
    var points = this.props.points;
    return (
      <div>
          <div id="label" className="label">
            <div className="label__left">
              <div className="label__left__text">You are about to redeem <span id="product"></span> for <span id="cost"></span></div> 
              <div className="label__left__image">
                <img src="../static/img/coin.svg" />
              </div> 
            </div>
            <div className="label__right">
              <div onClick={this.removeLabel} className="label__right__cancel">Cancel</div>
              <div onClick={this.redeem} className="label__right__redeem">Redeem now</div>
            </div>
          </div>
          <div className={"outer-sortbar"+ ' ' +"outer-sortbar--"+(this.state.isTop ? 'normal' : 'fixed')}>
          <div className="sortbar">
          <div className="sortbar__title">Sort by:</div>
          <div className="sortbar__buttons">
            <div onClick={this.sortMostRecent} className={this.state.buttonPressed1 ? "sortbar__buttons__button sortbar__buttons__button--isactive" : "sortbar__buttons__button"}>Most recent</div>
            <div onClick={this.sortLowestCost} className={this.state.buttonPressed2 ? "sortbar__buttons__button sortbar__buttons__button--isactive" : "sortbar__buttons__button"}>Lowest price</div>
            <div onClick={this.sortHighestCost} className={this.state.buttonPressed3 ? "sortbar__buttons__button sortbar__buttons__button--isactive" : "sortbar__buttons__button"}>Highest price</div>
          </div>
      </div>
      </div>
      <div className="grid">
        {this.state.products.map(function(item, index) {
            if (item.cost <= points){
              return(
                <LazyLoad>
                <div className="grid__item">
                  <div className="grid__item__overlay">
                  <svg width="42px" height="42px" viewBox="0 0 42 42" version="1.1">
                      <defs>
                          <radialGradient cx="50%" cy="50.8764901%" fx="50%" fy="50.8764901%" r="79.8469947%" id="radialGradient-1">
                              <stop stop-color="#0AD4FA" offset="0%"></stop>
                              <stop stop-color="#25BBF1" offset="100%"></stop>
                          </radialGradient>
                      </defs>
                      <g id="Catalog" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="Page-1" transform="translate(-354.000000, -684.000000)">
                              <g id="products" transform="translate(132.000000, 660.000000)">
                                  <g id="line-1">
                                      <g id="product-card" transform="translate(0.000000, 12.000000)">
                                          <g id="icon" transform="translate(222.000000, 12.000000)">
                                              <circle id="circle" fill="url(#radialGradient-1)" cx="21" cy="21" r="21"></circle>
                                              <path d="M29.9946924,29.1076172 L28.8822001,15.5306936 C28.8580225,15.225303 28.594495,14.9894436 28.277518,14.9894436 L25.2452125,14.9894436 L25.2452125,13.9296875 C25.2452125,12.3142578 23.8849203,11 22.2129071,11 L19.7870627,11 C18.1150494,11 16.7547572,12.3142578 16.7547572,13.9296875 L16.7547572,14.9894436 L13.7224518,14.9894436 C13.4054748,14.9894436 13.1419472,15.225303 13.1177696,15.5306936 L12.0053178,29.1073828 C11.9665447,29.5939844 12.1411651,30.0784375 12.4843816,30.4365234 C12.8275982,30.7946094 13.3141821,31 13.8193238,31 L28.1806055,31 C28.6857472,31 29.1722907,30.7946484 29.5155477,30.4365625 C29.8588046,30.0784766 30.033425,29.5940234 29.9946924,29.1076172 Z M18,14.25 C18,13.00935 18.80748,12 19.8,12 L22.2,12 C23.19252,12 24,13.00935 24,14.25 L24,15 L18,15 L18,14.25 Z" id="bag" fill="#FFFFFF" fill-rule="nonzero"></path>
                                          </g>
                                      </g>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </svg>
                  <div className="grid__item__overlay__cost">
                    <div className="grid__item__overlay__cost__number">{item.cost}</div>
                    <div className="grid__item__overlay__cost__coin">
                      <img 
                      src="../static/img/coin.svg" 
                      onLoad={() => this.setState({loaded: true})}
                      /> 
                    </div>
                  </div>
                  <div onClick={() => { this.showLabel(item.name, item.cost) }}className="grid__item__overlay__button">Redeem prize</div>
                  </div>
                  <div className="grid__item__image">
                    <img src={item.img.url} />
                  </div>
                  <div className="grid__item__data">
                    <div className="grid__item__data__cat">{item.category}</div>
                    <div className="grid__item__data__name">{item.name}</div>
                  </div>  
                </div>
                </LazyLoad>
            )
            }
            else{
              return(
                <div className="grid__item grid__item--unaffordable">
                  <div className="grid__item__overlay">
                  <div className="grid__item__overlay__info">
                    <div className="grid__item__overlay__info__text">You need {-(points - item.cost)}</div>
                    <div className="grid__item__overlay__info__coin"><img src="../static/img/coin.svg" /></div>
                  </div>
                  
                  </div>
                  <div className="grid__item__image">
                    <img src={item.img.url} />
                  </div>
                  <div className="grid__item__data">
                    <div className="grid__item__data__cat">{item.category}</div>
                    <div className="grid__item__data__name">{item.name}</div>
                  </div>  
                </div>
            )
            }
        }, this)}
      </div>
        <p className="grid__message">Showing <span>{this.state.products.length}</span> awesome products</p>
      </div>
    )
  }
}

export default Products
