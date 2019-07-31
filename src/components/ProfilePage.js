import React from 'react'
import NavSidebar from '../containers/NavSideBar'
import PastDates from '../containers/PastDatesContainer'
import UpcomingDates from '../containers/UpcomingDatesContainer'

class ProfilePage extends React.Component {
state = {
  name: '',
  userId: null,
  currentDates: [],
  pastDates: [],
  phone: '',
  email: '',
  significant_other_phone: ''
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
          profileInfo.data.attributes.rendezvous.forEach((dateNight) => {
            var tempDate = new Date();
            var currentTime = new Date (tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate()-1);
            if (dateNight.date > currentTime.toISOString()){
              this.setState({  currentDates: [...this.state.currentDates, dateNight]})
            }
            else {
              this.setState({  pastDates: [...this.state.pastDates, dateNight]})
            }
          })
          this.setState({
            name: profileInfo.data.attributes.name,
            userId: profileInfo.data.id,
            phone: profileInfo.data.attributes.phone_number,
            email: profileInfo.data.attributes.email,
            significant_other_phone: profileInfo.data.attributes.significant_other_phone
          })
        })
  }   else {
    this.props.history.push('/')
  }
}

  cancelDate = (e, dateID) => {
    fetch(`http://localhost:3000/rendezvou/${dateID}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    .then(window.location.reload())
  }

  render(){
    return(
      <div>
        <h1>Welcome {this.state.name}</h1>
        <NavSidebar
        cancelDate={this.cancelDate}
        history={this.props.history}
        user_id={this.state.userId}
        dates={this.state.currentDates}
        dateTypes={this.props.dateTypes}
        usersName = {this.state.name}
        phone = {this.state.phone}
        email = {this.state.email}
        soPhone = {this.state.significant_other_phone}
        />
          <h2>Upcoming Dates</h2>
          <UpcomingDates dates={this.state.currentDates} clothing={this.props.clothing} dateTypes={this.props.dateTypes}/>
          <h2>Past Dates</h2>
          <PastDates dates={this.state.pastDates} clothing={this.props.clothing} dateTypes={this.props.dateTypes}/>
      </div>
    )
  }
}

export default ProfilePage
