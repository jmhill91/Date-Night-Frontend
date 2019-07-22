import React from 'react';
import './App.css';
import LoginAndSignup from './components/LoginAndSignUpPage'
import SignUp from './components/SignUpForm'
import Profile from './components/ProfilePage'
import { Switch, Route} from 'react-router-dom';

class App extends React.Component {
  state = {
    name: ''
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
          this.setState({
            name: profileInfo.name
          })
        })
  }}

  render(){
    return (
      <Switch>
      <Route exact path="/" component={LoginAndSignup}/>
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />
      </Switch>
    );
  }
}

export default App;
