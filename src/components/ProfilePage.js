import React from 'react'
import NavSidebar from '../containers/NavSideBar'
import PastDates from '../containers/PastDatesContainer'
import UpcomingDates from '../containers/UpcomingDatesContainer'

class ProfilePage extends React.Component {

  render(){
    return(
      <div>
      <h1>Welcome</h1>
      <NavSidebar />
      <h2>Upcoming Dates</h2>
      <h2>Past Dates</h2>
      </div>
    )
  }
}

export default ProfilePage
