import React from 'react';
import './App.css';
import LoginAndSignup from './components/LoginAndSignUpPage'
import SignUp from './components/SignUpForm'
import EditProfile from './components/EditProfile'
import Profile from './components/ProfilePage'
import CreateDate from './components/CreateDatePage'
import EditDate from './components/EditDatesPage'
import { Switch, Route} from 'react-router-dom';


const DATETYPES = 'https://date-night-backend.herokuapp.com/rendezvous_type'
const ATTIRE ='https://date-night-backend.herokuapp.com/attire'
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
        <Route path="/editdate" render={(routerProps) => <EditDate {...routerProps} clothing={this.state.clothing} dateTypes={this.state.dateTypes} /> } /> />
      <Route path="/profile" render={(routerProps) => <Profile {...routerProps} clothing={this.state.clothing} dateTypes={this.state.dateTypes} /> } />
      <Route path="/newdate" render={(routerProps) => <CreateDate {...routerProps} clothing={this.state.clothing} dateTypes={this.state.dateTypes} /> } />
      <Route path="/edit-profile" component={EditProfile} />
      </Switch>
    );
  }
}

export default App;
