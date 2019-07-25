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
            userId: profileInfo.data.id
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
        <div className='UpcomingDates'>
          <h2>Upcoming Dates</h2>
          <UpcomingDates dates={this.state.currentDates} clothing={this.props.clothing} dateTypes={this.props.dateTypes}/>
        </div>
        <div>
          <h2>Past Dates</h2>
          <PastDates dates={this.state.pastDates} clothing={this.props.clothing} dateTypes={this.props.dateTypes}/>
        </div>
      </div>
    )
  }
}

export default ProfilePage
