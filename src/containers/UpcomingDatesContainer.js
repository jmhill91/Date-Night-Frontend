import React from 'react'
import DateItem from '../components/DateItem'

class UpcomingDates extends React.Component {

  render(){
    let display;
    let sortedDates
    if (this.props.dates.length <= 0){
        display = <p>No Upcoming Dates to Display. Please add one.</p>
      } else {
        sortedDates = this.props.dates.sort((a,b) =>{
           return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
        })
          display = sortedDates.map(date =>{
            let outing=  this.props.dateTypes.find(dt => dt.id === date.rendezvous_type_id);
            let cloths= this.props.clothing.find(item => item.id === date.attire_id);
            if (cloths  && outing ){
              return <DateItem key={date.id} date={date} clothing={cloths.name} rendezvous={outing.name}/>
            }else {
              return <DateItem key={date.id} date={date} clothing={'loading'} rendezvous={'loading'}/>
            }

          })
          }
    return(
      <div >
      {display}
      </div>
    )
  }
}

export default UpcomingDates
