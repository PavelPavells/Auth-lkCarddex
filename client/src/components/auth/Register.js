import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import "./Auth.scss";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper">
        <div className="header">LOGO</div>
        <div className="base-wrapper">
          {/*<div className="auth-header">Register</div>*/}
          <form className="auth-form" noValidate onSubmit={this.onSubmit}>
            <Link to="/" className="link">
              Sign in
            </Link>
            <div className="auth-group">
              <div className="bottom-group">
                <label>
                  <div className="auth-label">Name</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className="auth-input"
                  />
                  <div className="auth-error">{errors.name}</div>
                </label>
              </div>
              <div className="auth-group">
                <label>
                  <div className="auth-label">Email address</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className="auth-input"
                  />
                  <div className="auth-error">{errors.email}</div>
                </label>
              </div>
              <div className="auth-group">
                <label>
                  <div className="auth-label">Password</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className="auth-input"
                  />
                  <div className="auth-error">{errors.password}</div>
                </label>
              </div>
              <div>
                <button type="submit" className="auth-button">
                  Sign up
                </button>
              </div>
            </div>
          </form>
          <div className="main-paragraph">
            <h1>Lorem ipsum dolor sit amet</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="footer">
          <a href="https://yandex.ru">About</a>
          <a href="https://yandex.ru">Contacts Us</a>
          <a href="https://yandex.ru">Help</a>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
