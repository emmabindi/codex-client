import React, { Component } from 'react';
import './Landing.scss';
import { backendServer } from '../shared/constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errMessage: '',
      loading: false,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  }

  async onFormSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch(`${backendServer}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error('incorrect credentials');
      } else {
        const { jwt } = await response.json();
        localStorage.setItem('token', jwt);
        this.props.landingProps.history.push('/dashboard');
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
        loading: false,
      });
    }
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    const { username, email, password, errMessage } = this.state;
    const { closePopUp } = this.props;
    return (
      <div className="popup">
        <div onClick={closePopUp} className="popup__close"></div>
        <div className="popup__wrapper">
          <div className="popup__inner">
            <button className="close-btn" onClick={closePopUp}>
              x
            </button>
            <h1>Login</h1>
            {errMessage && <span>{errMessage}</span>}
            <form className="user-form" onSubmit={this.onFormSubmit}>
              <input type="text" name="email" id="email" value={email} placeholder="email" onChange={this.onInputChange} />
              <input type="password" name="password" id="password" value={password} placeholder="password" onChange={this.onInputChange} />
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      show: 'main',
    };

    this.showPopUp = this.showPopUp.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
  }

  showPopUp(query) {
    this.setState({ show: query });
  }

  closePopUp() {
    this.setState({ show: 'main' });
  }

  render() {
    console.log(this.props);
    return (
      <div className="landingpage">
        <h1>Codex</h1>
        <h5>the learning & productivity app for devs</h5>
        <h6>capture journal entries including code snippets</h6>
        <h6>collect & categorize your bookmarks for easy reference</h6>
        <h6>track your goals and due date milestones</h6>
        <h6>view your learning & productivity statistics</h6>
        <button onClick={() => this.showPopUp('login')}>Login</button>
        {this.state.show === 'login' ? <Login landingProps={this.props} closePopUp={this.closePopUp} /> : null}
      </div>
    );
  }
}

export default Landing;
