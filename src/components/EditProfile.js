import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class EditProfileForm extends React.Component {
  state ={
    name: '',
    phoneNumber: '',
    email: '',
    significantOtherPhoneNumber: '',
  }
  componentDidMount(){
    if (!localStorage.token){
      this.props.history.push('/')
    }
    console.log(this.props.location);
    this.setState({
      name: this.props.location.name,
      phoneNumber: this.props.location.phone,
      email: this.props.location.email,
      significantOtherPhoneNumber: this.props.location.soPhone
    })
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }


  handleSubmit = (e) =>{
    e.preventDefault()
    console.log(e);
    fetch(`https://date-night-backend.herokuapp.com/users/${this.props.location.userId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    name: this.state.name,
    phone_number: this.state.phoneNumber,
    email: this.state.email,
    significant_other_phone: this.state.significantOtherPhoneNumber
  })
})
  .then(res => res.json())
  .then(parsedResponse => {
      this.props.history.push('/profile')
    })
  }

  render(){
    return (
      <div>
      <h1 className="SignUp-form-head">Update Your Profile!</h1>
      <Form onSubmit={this.handleSubmit}>
      <Form.Field>
      <label>Name</label>
      <input placeholder='Name' name='name' value={this.state.name} onChange={this.handleOnChange}/>
      </Form.Field>
      <Form.Field>
      <label>Phone Number</label>
      <input type='tel' name="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='999-999-9999' value={this.state.phoneNumber} onChange={this.handleOnChange}/>
      </Form.Field>
      <Form.Field>
      <label>Email</label>
      <input type='email' name='email' value={this.state.email} placeholder='Email' onChange={this.handleOnChange}/>
      </Form.Field>
      <Form.Field>
      <label>Significant Other Phone Number</label>
      <input type='tel' name="significantOtherPhoneNumber" value={this.state.significantOtherPhoneNumber} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='999-999-9999' onChange={this.handleOnChange}/>
      </Form.Field>

      <Button type='submit'>Submit</Button><br/>
      <p>* Only if applicable</p>
      </Form>
      </div>
    )
  }
}

export default EditProfileForm
