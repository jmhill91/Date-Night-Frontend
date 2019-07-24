import React from 'react'
import NavSidebar from '../containers/NavSideBar'
import PastDates from '../containers/PastDatesContainer'
import UpcomingDates from '../containers/UpcomingDatesContainer'

class ProfilePage extends React.Component {
state = {
  name: '',
  userId: null,
  currentDates: [],
  pastDates: []
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
            name: profileInfo.name,
            userId: profileInfo.id
          })
        })
  }   else {
    this.props.history.push('/')
  }
}

  render(){
    return(
      <div>
      <h1>Welcome {this.state.name}</h1>
      <NavSidebar history={this.props.history} user_id={this.state.userId}/>
      <h2>Upcoming Dates</h2>
      <UpcomingDates />
      <h2>Past Dates</h2>
      <PastDates />
      </div>
    )
  }
}

export default ProfilePage
