import React from 'react';
import './App.css';
import LoginAndSignup from './components/LoginAndSignUpPage'
import SignUp from './components/SignUpForm'
import { Switch, Route} from 'react-router-dom';

class App extends React.Component {

  render(){
    return (
      <Switch>
      <Route exact path="/" component={LoginAndSignup}/>
      <Route path="/signup" component={SignUp} />
      </Switch>
    );
  }
}

export default App;
