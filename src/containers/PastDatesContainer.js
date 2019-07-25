import React from 'react'


// if (this.props.dates.length >= 0){
//   display = <p>No Past Dates to Display</p>
// } else {
//   display = <p>About to add</p>
// }
class PastDates extends React.Component {

  render(){
    console.log(this.props);
    let display;
    return(
      <div>
      <p>No Past Dates to Display</p>
      </div>
    )
  }
}

export default PastDates
