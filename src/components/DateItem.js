import React from 'react'
import Moment from 'react-moment'
import 'moment-timezone'

class DateItem extends React.Component {


  render(){
    let babysitter;
    if (this.props.date.babysitter === true) {
        babysitter = <li> Don't Forget the Babysitter </li>
    }else {
      babysitter = <li> No Babysitter Needed </li>
    }
    return(
      <div className="dateShow">
      <Moment format="MM-DD-YYYY" tz="UTC">
               {this.props.date.date}
           </Moment>
           &nbsp;
           <Moment format="LT" tz="UTC">
                    {this.props.date.time}
                </Moment><br/>
                <ul>
                <li>Date Type: {this.props.rendezvous}</li>
                <li>Attire: {this.props.clothing}</li>
                <li>Pick-Up Location: {this.props.date.location}</li>
                {babysitter}
                </ul>
      </div>
    )
  }
}

export default DateItem
