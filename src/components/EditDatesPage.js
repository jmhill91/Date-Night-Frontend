import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import moment from 'moment'
import Moment from 'react-moment'

class NewDate extends React.Component  {

  state = {
    date: null,
    time: null,
    location: '',
    user_id: this.props.location.user_id,
    attire_id: null,
    rendezvous_type_id: null,
    babysitter: true
  }
  componentDidMount(){
    if (!localStorage.token){
      this.props.history.push('/')
    }
    let rendezvou = this.props.history.location.rendezvou_id
    fetch(`https://date-night-backend.herokuapp.com/rendezvou/${rendezvou}`)
    .then(resp => resp.json())
    .then(rend => {
      this.setState({
        date: rend.date,
        time: rend.time,
        location: rend.location,
        user_id: rend.user_id,
        attire_id: rend.attire_id,
        rendezvous_type_id: rend.rendezvous_type_id,
        babysitter: rend.babysitter
      });
    })
  }

  handelSubmit = (e) => {
    e.preventDefault()
    fetch(`https://date-night-backend.herokuapp.com/rendezvou/${this.props.history.location.rendezvou_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(rendezvousRes => {
      this.props.history.push('/profile')
    })

  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDateSelect = (e) => {
    this.setState({ rendezvous_type_id: e.target.value})
  }

  handleAttireSelect = (e) => {
    this.setState({attire_id: e.target.value});
  }

  handleBabysitter = (e) => {
    this.setState({babysitter: !this.state.babysitter})
  }

  render(){
      let addAttire = this.props.clothing.map(clothes => {
        if (clothes.id === this.state.attire_id) {
          return  <option key={clothes.id} value={clothes.id} selected="selected">{clothes.name}</option>
        } else {
            return <option key={clothes.id} value={clothes.id}>{clothes.name}</option>
        }
        })

        let addDates = this.props.dateTypes.map(date => {
          if (date.id === this.state.rendezvous_type_id) {
            return <option key={date.id} value={date.id} selected="selected">{date.name}</option>
          } else {
            return <option key={date.id} value={date.id}>{date.name}</option>
          }
        })

    return(
      <div onSubmit={this.handelSubmit}>
      <h1>Edit Your Date</h1>
      <Form>
      <Form.Field>
        <label>Date</label>
        <input type='date' name='date' value={moment(this.state.date).format('YYYY-MM-DD')} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Time</label>
        <input type='time' name='time' onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Where Are You Going to Pick Them Up?</label>
        <input value={this.state.location} name='location' onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Do you Need a Babysitter?</label>
          <Checkbox onChange={this.handleBabysitter} value='babysitter' label='Babysitter' checked={this.state.babysitter} />
      </Form.Field>
      <Form.Field >
        <label>Select a Date Type</label>
        <select onChange={this.handleDateSelect}>
          <option value="Select">Please Pick a Type</option>
          {addDates}
        </select>
      </Form.Field>
      <Form.Field>
        <label>Select Attire Needed For Date</label>
        <select onChange={this.handleAttireSelect}>
          <option value="Select">Please Pick a Type</option>
          {addAttire}
        </select>
      </Form.Field>
      <Form.Field>
        <label>Is this Date a Surprise?</label>
        <Checkbox label='Surprise' />
      </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      </div>
    )
  }
}

export default NewDate
