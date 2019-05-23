import React, { Component } from 'react';
import './App.css';
import Form from '../Form/form.js';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig.js';
firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
  }
  render() {
    return (
        <div className="app">
          <div className="app__header">
            <h1>Chat With Me!</h1>
            <h3>
              By David Shin
            </h3>
            { !this.state.user ? (
                <button
                    className="app__button"
                    onClick={this.handleSignIn.bind(this)}
                >
                  Sign in
                </button>
            ) : (
                <button
                    className="app__button"
                    onClick={this.handleLogOut.bind(this)}
                >
                  Logout
                </button>
            )}
          </div>
          <div className="app__list">
            <Form user={this.state.user} />
          </div>
        </div>
    );
  }
}
export default App;