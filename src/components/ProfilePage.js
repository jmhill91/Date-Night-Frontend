import React from 'react'
import NavSidebar from '../containers/NavSideBar'
import PastDates from '../containers/PastDatesContainer'
import UpcomingDates from '../containers/UpcomingDatesContainer'

class ProfilePage extends React.Component {
state = {
  name: ''
}
  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3000/profile', {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(res => res.json())
        .then(profileInfo =>{
          this.setState({
            name: profileInfo.name
          })
        })
  }}

  render(){
    console.log(this.props)
    return(
      <div>
      <h1>Welcome {this.state.name}</h1>
      <NavSidebar history={this.props.history}/>
      <h2>Upcoming Dates</h2>
      <h2>Past Dates</h2>
      </div>
    )
  }
}

export default ProfilePage
