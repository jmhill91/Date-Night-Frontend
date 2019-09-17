import React from 'react'
import DateItem from '../components/DateItem'


class PastDates extends React.Component {

  render(){
    let display = [];
    let sortedDates
    if (this.props.dates.length <= 0){
        display = <p>No Past Dates to Display</p>
      } else {
          sortedDates = this.props.dates.sort((a,b) =>{
             return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
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
          display.length = 5
          }
    return(
      <div >
      {display}
      </div>
    )
  }
}

export default PastDates
