import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class NewDate extends React.Component  {

  state = {
    date: null,
    time: null,
    location: '',
    user_id: this.props.location.user_id,
    attire_id: null,
    rendezvous_type_id: null,
    babysitter: false,
    soPhone: this.props.location.soPhone,
    message: '',
    surprise: false,
    rend_name: '',
    attire_name: ''
  }

  componentDidMount(){
    if (!localStorage.token){
      this.props.history.push('/')
    }
  }

  handelSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/rendezvou', {
      method: 'POST',
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
    this.setState({message: `${this.props.location.name} would like to take you on a date to ${this.state.rend_name} on ${this.state.date} at ${this.state.time}. They will meet you at ${this.state.location}. Please wear ${this.state.attire_name}.`})
  }

  handleDateSelect = (e) => {
    let found
    found = this.props.dateTypes.find(date => {
    return  date.id == e.target.value
    })
    this.setState({ rendezvous_type_id: e.target.value, rend_name: found.name})
    this.setState({message: `${this.props.location.name} would like to take you on a date to ${found.name} on ${this.state.date} at ${this.state.time}. They will meet you at ${this.state.location}. Please wear ${this.state.attire_name}.`})
  }

  handleAttireSelect = (e) => {
    let found
    found = this.props.clothing.find(date => {
    return  date.id == e.target.value
    })
    this.setState({attire_id: e.target.value, attire_name: found.name});
    this.setState({message: `${this.props.location.name} would like to take you on a date to ${this.state.rend_name} on ${this.state.date} at ${this.state.time}. They will meet you at ${this.state.location}. Please wear ${found.name}.`})
  }

  handleBabysitter = (e) => {
    this.setState({babysitter: !this.state.babysitter})
  }

  handleSurprise = (e) => {
    this.setState({surprise: !this.state.surprise})
  }

  render(){
    console.log(this.state);
      let addAttire = this.props.clothing.map(clothes => {
          return  <option key={clothes.id} value={clothes.id}>{clothes.name}</option>
        })

        let addDates = this.props.dateTypes.map(date => {
          return <option className={date.name} key={date.id} value={date.id}>{date.name}</option>
        })

    return(
      <div onSubmit={this.handelSubmit}>
      <h1>Plan Your Date</h1>
      <Form>
      <Form.Field>
        <label>Date</label>
        <input type='date' name='date' onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Time</label>
        <input type='time' name='time' onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Where Are You Going to Pick Them Up?</label>
        <input placeholder='Location' name='location' onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Do you Need a Babysitter?</label>
        <Checkbox onChange={this.handleBabysitter} value='babysitter' label='Babysitter' />
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
        <Checkbox onChange={this.handleSurprise}label='Surprise' />
      </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      </div>
    )
  }
}

export default NewDate
