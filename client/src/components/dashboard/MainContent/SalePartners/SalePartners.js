/** ********** IMPORT LIBRARIES ********** */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

/** ********** IMPORT LOADER from __UTILS__ ********** */
import Loader from "../../../../__utils__/Spinner";

/** ********** IMPORT ACTIONS ********** */
import { 
  fetchDataSalePartners,
  fetchDataLastPageSalePartners 
} from "../../../../actions/salePartnersActions";

/** ********** IMPORT STYLES ********** */
import "./SalePartners.scss";

class SalePartners extends Component {

  state = {
    login: "",
    startDate: null,
    endDate: null,
    offset: 0,
    page: 0,
    optionFilter: 15,
    price: 0
  };

  /** ********** FETCH DATA ACCOUNT ********** */
  componentDidMount() {
    let data = {
      offset: this.state.offset,
      size: this.state.optionFilter,
      login: this.props.data
    }
    this.props.fetchDataSalePartners(data);
  }

  /** ********** CHANGE DATES FOR SEARCH ********** */
  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate }, () => {
      let data = {
        offset: this.state.offset,
        size: this.state.optionFilter,
        startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null, // eslint-disable-line
        endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null, // eslint-disable-line
        login: this.props.data
      }
      this.props.fetchDataSalePartners(data);
    });
  };

  /** ********** FIRST PAGE SALE PARTNERS PAGINATION ********** */
  getFirstPage = () => {
    this.setState({ page: 0 });
      let data = {
        offset: 0,
        size: this.state.optionFilter,
        login: this.props.data,
        startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null, // eslint-disable-line
        endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null // eslint-disable-line
      }
      this.props.fetchDataSalePartners(data);
  };

  /** ********** PREVIOUS PAGE SALE PARTNERS PAGINATION ********** */
  getPreviousPage = () => {
    this.setState(prevState => {
        return prevState.page > 0 ? ({ page: prevState.page - 1 }) : null;
      }, () => {
        let data = {
          offset: this.state.page,
          size: this.state.optionFilter,
          login: this.props.data,
          startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null, // eslint-disable-line
          endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null // eslint-disable-line
        }
        this.props.fetchDataSalePartners(data);
      }
    );
  };

  /** ********** NEXT PAGE SALE PARTNERS PAGINATION ********** */
  getNextPage = () => {
    //const { payload } = this.props.pricelist.data;
    this.setState(prevState => { 
      //return prevState.page >= 0 && prevState.page < payload.page ? ({ page: prevState.page + 1 }) : null;
        return prevState.page >= 0 ? ({ page: prevState.page + 1 }) : null;
      }, () => {
        let data = {
          offset: this.state.page,
          size: this.state.optionFilter,
          login: this.props.data,
          startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null, // eslint-disable-line
          endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null // eslint-disable-line
        }
        this.props.fetchDataSalePartners(data);
      }
    );
  };

  /** ********** LAST PAGE SALE PARTNERS PAGINATION ********** */
  getLastPage = () => {
    console.log('NOT PAGE FIELD')
    //const { payload } = this.props.pricelist.data;
    //this.setState({ page: payload.page });
    //let data = {
    //    offset: this.state.offset,
    //    size: this.state.optionFilter,
    //    login: this.props.data,
    //    startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null, // eslint-disable-line
    //    endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null // eslint-disable-line
    //  }
    //  this.props.fetchDataLastPageSalePartners();
  };

  /** ********** REFRESH DATA FOR SALE PARTNERS TABLE ********** */
  handleRefreshData = () => {
    let data = {
      offset: this.state.page,
      size: this.state.optionFilter,
      login: this.props.data
    }
  this.props.fetchDataSalePartners(data);
  };

  /** ********** FILTER FOR VISION DATA IN TABLE ********** */
  handleOptionFilter = event => {
    let elem = event.target.value;
    this.setState({
        optionFilter: elem
      }, () => {
        let data = {
          offset: this.state.page,
          size: this.state.optionFilter,
          login: this.props.data,
          startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null, // eslint-disable-line
          endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : null // eslint-disable-line
        }
        this.props.fetchDataSalePartners(data);
      }
    );
  };
  render() {
    const { salepartners } = this.props;
    //console.log(salepartners);
    if (salepartners.data.length === 0) {
      return <Loader />
    }
    return (
      <main className="main-content">
        {/** ========================== HEADER TABLE ============================== */}

        <header className="wrapper-table__header">
          <section className="table__header-left">
            <div className="table__header-left-up"></div>
          </section>
          <section className="table__header-right">
            <form onChange={this.handleSendSearch}>
              <DateRangePicker
                anchorDirection="left"
                block={false}
                customArrowIcon={null}
                customCloseIcon={null}
                customInputIcon={null}
                disabled={false}
                displayFormat={function noRefCheck() {}}
                enableOutsideDays={false}
                horizontalMargin={0}
                initialVisibleMonth={null}
                isDayBlocked={function noRefCheck() {}}
                isDayHighlighted={function noRefCheck() {}}
                isOutsideRange={function noRefCheck() {}}
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput =>
                  this.setState({ focusedInput })
                } // PropTypes.func.isRequired,
                startDatePlaceholderText="Дата начала"
                endDatePlaceholderText="Дата конца"
                showClearDates
                navNext={null}
                navPosition="navPositionTop"
                navPrev={null}
                onNextMonthClick={function noRefCheck() {}}
                onPrevMonthClick={function noRefCheck() {}}
              />
            </form>
          </section>
        </header>

        {/** ========================== HEADER MAIN TABLE ============================== */}

        <section className="wrapper-table__main-sales">
          <section className="wrapper-table__header-sales">
            {salepartners.data.payload.recordDisplayRules.map((index, key) => {
              if (index.visible === 1) {
                return (
                  <div key={index.field_name} className="name-of-product">
                    <div
                      className="table-header__text"
                      style={{ textAlign: "center" }}
                    >
                      <strong>{index.display_name}</strong>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </section>

          {/** ========================== DOOR  TABLE ============================== */}

          <section className="wrapper-table__main-categories">
            <div
              className="wrapper-itype__name"
            >
              {salepartners.data.payload.recordSet.map((index, key) => (
                <div
                  key={key.index}
                  className="wrapper-column"
                >
                  <div className="toggle-itype-name-sales" key={key.id}>
                    <div>{index.discount_sum ? index.discount_sum.toFixed(0) : index.discount_sum}</div>
                  </div>
                  <div className="toggle-itype-name-sales" key={key.id}>
                    <div className="numbers">{index.cash_sum_accum ? index.cash_sum_accum.toFixed(2) : index.cash_sum_accum}</div>
                  </div>
                  <div className="toggle-itype-name-sales" key={key.id}>
                    <div className="numbers">
                      {index.valid_after ? index.valid_after.replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : index.valid_after} {/* eslint-disable-line */}
                    </div>{" "}
                  </div>
                  <div className="toggle-itype-name-sales" key={key.id}>
                    <div>
                      {index.valid_until ? index.valid_until.replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : index.valid_until} {/* eslint-disable-line */}
                    </div>{" "}
                  </div>
                  <div className="toggle-itype-name-sales" key={key.id}>
                    <div className="numbers">{index.discount_sum_next}</div>
                  </div>
                  {/*<div className="toggle-future-price" key={key.id}>{index.future_price}</div>*/}
                  <div className="toggle-itype-name-sales" key={key.id}>
                    <div className="numbers">{index.cash_delta_next}</div>
                  </div>
                  <div className="toggle-itype-name-sales" key={key.id}>
                    <div className="numbers">{index.deadline ? index.deadline.replace(/([^T]+)T([^\.]+).*/g, "$1 $2") : index.deadline}</div> {/* eslint-disable-line */}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/** ========================== ELECTRONIC CONTROL  TABLE ============================== */}
        </section>

        {/** ========================== FOOTER TABLE ============================== */}

        <footer className="wrapper-table__footer">
          <section className="wrapper-table__footer-left">
            <div
              onClick={this.getFirstPage}
              className="footer-table__first-page"
            ></div>
            <div
              onClick={this.getPreviousPage}
              className="footer-table__prev-page"
            ></div>
            <div
              onClick={this.getNextPage}
              className="footer-table__next-page"
            ></div>
            <div
              onClick={this.getLastPage}
              className="footer-table__last-page"
            ></div>
            <div className="footer-table__options">
              <label>
                <select
                  value={this.state.optionFilter}
                  onChange={this.handleOptionFilter}
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
            <div className="footer-table__text">Позиций на странице</div>
          </section>
          <section className="wrapper-table__footer-right">
            <div className="footer-table__pages">
              {this.state.optionFilter} из {salepartners.data.payload.countUUID}
            </div>
            {<Loader /> && (
              <div
                onClick={this.handleRefreshData}
                className="footer-table__refresh-data"
              ></div>
            )}
          </section>
        </footer>
      </main>
    );
  }
}
SalePartners.propTypes = {
    salepartners: PropTypes.object.isRequired,
    fetchDataSalePartners: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    salepartners: state.salepartners
});
export default connect(
  mapStateToProps, 
  { fetchDataSalePartners, fetchDataLastPageSalePartners }
)(SalePartners);