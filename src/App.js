import React from 'react';
import './App.css';
import LoginAndSignup from './components/LoginAndSignUpPage'
import SignUp from './components/SignUpForm'
import Profile from './components/ProfilePage'
import CreateDate from './components/CreateDatePage'
import { Switch, Route} from 'react-router-dom';


const DATETYPES = 'http://localhost:3000/rendezvous_type'
const ATTIRE ='http://localhost:3000/attire'
class App extends React.Component {
  state = {
    clothing: [],
    dateTypes: []
  }

  componentDidMount(){
    fetch(DATETYPES)
    .then(resp => resp.json())
    .then(dates => {
    this.setState({dateTypes: dates})
    })

    fetch(ATTIRE)
    .then(resp => resp.json())
    .then(option =>{
      this.setState({clothing: option})
    })

  }


  render(){
    return (
      <Switch>
      <Route exact path="/" component={LoginAndSignup}/>
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" render={(routerProps) => <Profile {...routerProps} clothing={this.state.clothing} dateTypes={this.state.dateTypes} /> } />
      <Route path="/newdate" render={(routerProps) => <CreateDate {...routerProps} clothing={this.state.clothing} dateTypes={this.state.dateTypes} /> } />
      </Switch>
    );
  }
}

export default App;
