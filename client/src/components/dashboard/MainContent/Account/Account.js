/** ********** IMPORT LIBRARIES ********** */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

/** ********** IMPORT ACTIONS ********** */
import { fetchDataAccount } from "../../../../actions/accountActions";

/** ********** IMPORT LOADER from __UTILS__ ********** */
//import Loader from "../../../../__utils__/Spinner";

/** ********** IMPORT STYLES ********** */
import "./Account.scss";

class Account extends Component {
  //constructor(props) {
  //  super(props);
    state = {
      company_name: "",
      company_inn: "",
      name: "",
      pass: "",
      email: "",
      contact_person: "",
      company_phone: "",
      errors: {}
    };
    //console.log(props);
  //}

  /** ********** FETCH DATA ACCOUNT ********** */
  componentDidMount() {
    //this.props.fetchDataAccount();
  }

  /** ********** CHANGE DATA FOR REIGSTER ACCOUNT ********** */
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  /** ********** RESPONSE DATA FOR LOGIN ACCOUNT ********** */
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      company_name: this.state.company_name,
      company_inn: this.state.company_inn,
      name: this.state.name,
      pass: this.state.pass,
      email: this.state.email,
      contact_person: this.state.contact_person,
      company_phone: this.state.company_phone,
      errors: {}
    };
    this.props.fetchDataAccount(userData);
  };
  render() {
    //const { account } = this.props;
    //console.log(account);
    //if(account.data.length === 0 || account.isFetching) {
    //  return <Loader />
    //}
    console.log(this.props)
    return (
      <div className="main-content">

        {/**-------------------------- НАСТРОЙКА УЧЕТНОЙ ЗАПИСИ ------------------------------ */}
        
          <h3>Основные настройки</h3>
          <div className="main-content__main-settings-wrapper">
            <p>Информация о Вашем профиле</p>
            <form
              className="main-content__main-settings-form"
              onSubmit={this.onSubmit}
            >
              <label>
                <div className="auth-label">Наименование компании</div>
                <input
                  value={this.state.company_name}
                  onChange={this.onChange}
                  id="company_name"
                  type="company_name"
                  className="auth-input main-content__forms"
                />
                <div className="auth-label__description">
                  Изменить наименование компании Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">ИНН</div>
                <input
                  value={this.state.company_inn}
                  onChange={this.onChange}
                  id="company_inn"
                  type="company_inn"
                  className="auth-input"
                />
                <div className="auth-label__description">
                  Изменить ИНН компании Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">Имя пользователя</div>
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  id="name"
                  type="name"
                  className="auth-input"
                />
                <div className="auth-label__description">
                  Изменить имя пользователя Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">Пароль</div>
                <input
                  value={this.state.pass}
                  onChange={this.onChange}
                  id="pass"
                  type="password"
                  className="auth-input"
                />
                <div className="auth-label__description">
                  Изменить пароль Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">Email</div>
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  id="email"
                  type="email"
                  className="auth-input"
                />
                <div className="auth-label__description">
                  Изменить Email Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">Контактное лицо</div>
                <input
                  value={this.state.contact_person}
                  onChange={this.onChange}
                  id="contact_person"
                  type="contact-person"
                  className="auth-input"
                />
                <div className="auth-label__description">
                  Изменить контактное лицо Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">Телефон</div>
                <input
                  value={this.state.company_phone}
                  onChange={this.onChange}
                  id="company_phone"
                  type="company_phone"
                  className="auth-input"
                />
                <div className="auth-label__description">
                  Изменить телефон Вы можете здесь.
                </div>
              </label>
              <button type="submit" className="auth-button">
                Изменить настройки
              </button>
            </form>
          </div>
        

        {/**-------------------------- НАСТРОЙКА АВАТАРА ------------------------------ */}

        
          {/*<h2>Изменить Аватар</h2>*/}
          <div className="main-content__main-settings upload-photo">
            <div className="main-content__wrapper-text">
              <h3>Здесь Вы можете поменять Ваш Аватар</h3>
              <p>
                Вы можете загрузить фото <br /> с Вашего компютера или выбрать
                на сайте
                <br />
                <a
                  href="https://gravatar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gravatar.com
                </a>
              </p>
            </div>
            <div className="main-content__main-settings-wrapper">
              <div className="main-content__change-photo"></div>
              <div className="main-content__condition-wrapper">
                <input type="file" name="file" id="file" className="inputfile" />
                <label htmlFor="file">Выбрать фото</label>
                <p>Максимальный размер 200Кб.</p>
              </div>
            </div>
          </div>
        {/**---------------------- СЕКЦИЯ ДОПОЛНИТЕЛЬНЫХ НАСТРОЕК ------------------- */}
        <div className="main-content__main-settings">
          <div className="main-content__main-settings-wrapper"></div>
        </div>
      </div>
    );
  }
}
Account.propTypes = {
    data: PropTypes.object.isRequired,
    fetchDataAccount: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    data: state.account
});
export default withRouter(
  connect(
    mapStateToProps,
    { fetchDataAccount }
  )(Account)
);