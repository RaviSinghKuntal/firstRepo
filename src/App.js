import './App.css';
import { Component, Fragment } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    username: '',
    password: ''
  }
}

handleClick = () => {
  alert('Button clicked');
  
}

  render() {
    return <Fragment>
      <div id="login">
        {/* <input class='input' value={this.state.username} placeholder='Username'></input><br /><br />
        <input class='input' value={this.state.username} placeholder='Password' type='password'></input><br /><br />
        <button onClick={this.handleClick}>Submit</button> */}
        <SignupForm />
        {/* <LoginForm /> */}
      </div>
    </Fragment>
  }
}

export default App;
