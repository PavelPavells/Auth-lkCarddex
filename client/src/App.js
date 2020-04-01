/** ********** IMPORT LIBRARIES ********** */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import axios from 'axios'
import jwt_decode from "jwt-decode";

/** ********** IMPORT COMPONENTS from __UTILS__ ********** */
import setJWTToken from './__utils__/setJWTToken';
import { logout } from './actions/securityActions';
import { SET_CURRENT_USER } from './constants/types';
//import SecuredRoute from './utils/SecureRoute';

/** ********** IMPORT REDUX STORE ********** */
import store from "./store/store";

/** ********** IMPORT GLOBAL SETTINGS ********** */
import site from "./constants/Global";

/** ********** IMPORT COMPONENTS ********** */
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Layout from "./components/dashboard/Layout";

/** ********** IMPORT STYLES ********** */
import "./App.scss";

const jwtToken = localStorage.jwtToken
if(jwtToken) {
  setJWTToken(jwtToken)
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  })
  const currentTime  = Date.now() / 1000
  if(decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = '/'
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      uuid: null,
      contragentName: null,
      partnerStatus: null,
      success: null,
      err: null
    }
  }
  loginUser = (email, pass) => {
    axios
      .post(`${site}`, {
        email: email,
        pass: pass
      })
      .then(res => {
        this.setState({
          data: res.data,
          loadingData: true,
          uuid: localStorage.setItem('uuid', res.data.uuid),
          contragentName: localStorage.setItem('contragentName', res.data.contragentName),
          partnerStatus: localStorage.setItem('partnerStatus', res.data.partnerStatus),
          success: localStorage.setItem('success', res.data.success),
          err: localStorage.setItem('err', res.data.err)
        });
      });
  }
  logoutUser = () => {
    localStorage.clear()
  }
  render() {
    //console.log(this.props);
    const { data } = this.state;
    console.log(this.state.data)
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" render={() => <Login loginUser={this.loginUser} data={data} history={window.history} />}/>
              <Route exact path="/register" render={() => <Register />} />  {/** "/register/:name/:email" */}
              <Route exact path="/:dashboard" render={() => (data.length === 0 && Storage.uuid === null) ? <Redirect to="/" /> : <Layout data={data} logoutUser={this.logoutUser} history={window.history} />} />
              {/*<SecuredRoute
                component={localStorage.jwtToken ? Layout : NotFound}
              />*/}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;