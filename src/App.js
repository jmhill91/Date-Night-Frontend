import React from 'react';
import './App.css';
import LoginAndSignup from './components/LoginAndSignUpPage'
import SignUp from './components/SignUpForm'
import Profile from './components/ProfilePage'
import CreateDate from './components/CreateDatePage'
import { Switch, Route} from 'react-router-dom';

class App extends React.Component {




  render(){
    return (
      <Switch>
      <Route exact path="/" component={LoginAndSignup}/>
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/newdate" component={CreateDate} />
      </Switch>
    );
  }
}

export default App;
