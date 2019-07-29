import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'



class LoginAndSignup extends React.Component {
  state ={
    username: '',
    password: ''
  }

  handelSignUp = () => {
  this.props.history.push("/signup")
  }

  componentDidMount(){
    if (localStorage.token){
      this.props.history.push('/profile')
    }
  }

  handelLogin = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(parsRes => {
      if(parsRes.token){
        localStorage.setItem('token', parsRes.token)
        this.props.history.push('/profile')
      } else {
        alert('Wrong Username or Password. Please try again.')
      }
    })
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render(){

    return  (
      <div>
      <h1>Welcome to Date Night</h1>
        <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
        <Form onSubmit={this.handelLogin}>
        <Form.Input name='username' icon='user' iconPosition='left' label='Username' placeholder='Username' onChange={this.handleInput}/>
        <Form.Input name='password' icon='lock' iconPosition='left' label='Password' type='password' onChange={this.handleInput}/>

        <Button content='Login' primary />
        </Form>
        </Grid.Column>

        <Grid.Column verticalAlign='middle'>
        <Button onClick={this.handelSignUp} content='Sign up' icon='signup' size='big' />
        </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
        </Segment>
        </div>
      )
  }
}

export default LoginAndSignup
