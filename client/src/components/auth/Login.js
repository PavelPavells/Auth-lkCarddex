import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import "./Auth.scss";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    }; 
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };
  fillDemoEmail = () => {
    this.setState({ email: "test@test.com" });
  };
  fillDemoPassword = () => {
    this.setState({ password: "test123" });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper">
        <div className="header">ЛОГО</div>
        <div className="base-wrapper">
          {/*<div className="auth-header">Sign In</div>*/}
          <form className="auth-form" noValidate onSubmit={this.onSubmit}>
            <div className="auth-group">
              <div className="bottom-group">
                <Link to="/register" className="link">
                  Регистрация
                </Link>
                <Link to="/" className="link">
                  Вход
                </Link>
              </div>
              <label>
                <div className="auth-label">Email</div>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className="auth-input"
                />
                <div className="auth-error"> 
                  {errors.email}
                  {errors.emailnotfound}
                </div>
              </label>
            </div>
            <div className="auth-group">
              <label>
                <div className="auth-label">Пароль</div>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="auth-input"
                />
                <div className="auth-error">
                  {errors.password}
                  {errors.passwordincorrect}
                </div>
              </label>
            </div>
            <div>
              <button type="submit" className="auth-button">
                Войти
              </button>
            </div>
          </form>
          <div className="main-paragraph">
            <h1>Lorem ipsum dolor sit amet</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
            <p>
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="footer">
          <a href="https://yandex.ru">О Нас</a>
          <a href="https://yandex.ru">Связаться с нами</a>
          <a href="https://yandex.ru">Помощь</a>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
