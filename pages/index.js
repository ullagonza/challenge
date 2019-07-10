import React from 'react'
import Head from '../components/Head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Products from '../components/Products'
import { userInfo } from 'os';

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
     loading: true, 
     //Ver si puedo agrupar name y points en un string user[]
     name: null,
     points: null,
     pointsFromChild: null,
    };
    this.updateUserPoints = this.updateUserPoints.bind(this)
  }

  updateUserPoints(newPoints) {
    this.setState( {points: newPoints});
  }

  async componentDidMount() {
    const response = await fetch('https://coding-challenge-api.aerolab.co/user/me', {
         headers: new Headers({
         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDFkMmY4NzM2ZjEyNTAwNmZmOWIzZTAiLCJpYXQiOjE1NjIxOTM3OTl9.QaUDZ3qJA5FMwz0ThhGWoIxJ8pFpZv9I00XZM40PORc",
      })
    })
    const data = await response.json();
    this.setState({ name: data.name, points: data.points, loading: false });
    console.log(this.state.name)
  };

  render () {
    return (
      <main>
        <Head
        title='Electronics'
        description='Productos de electrónica'
        />
        <Header name={this.state.name} points={this.state.points} />
        <Banner />
        <Products points={this.state.points} action={this.updateUserPoints}/>
      </main>
    )
  }
}