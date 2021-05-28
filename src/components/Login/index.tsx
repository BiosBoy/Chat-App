import React from 'react';
import { connect } from 'react-redux';

import { IProps, IState, TInputsValues } from './interfaces';

import { userLoggedIn } from '../../controller/actions/users';

import globalStyles from '../../styles/index.scss';
import styles from './index.scss';

import { AUTH_END_POINT } from '../../constants/API';

const LOGIN_MESSAGES = {
  notLogged: 'You\'re not logged :( Please make a sign in.'
};

class Login extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isFetch: false,
      isWithCredits: false,
      error: null,
      message: null,
      emailValue: '',
      passwordValue: ''
    };
  }

  _handleChange = ({ target }) => {
    const { value, id } = target;
    const normalizedID = (id && id.substr(1, id.length)) || '';
    const normalizedKey = `${normalizedID}Value` as TInputsValues;

    // @ts-ignore
    this.setState({
      [normalizedKey]: value
    });
  }

  _handlerCheck = () => {
    const { isFetch } = this.state;

    if (isFetch) {
      return;
    }

    this.setState(prevState => ({
      isWithCredits: !prevState.isWithCredits
    }));
  }

  _handlerSubmit = e => {
    e.preventDefault();

    if (!this._checkFilledForm()) {
      return;
    }

    const { isWithCredits, passwordValue, emailValue } = this.state;

    this._setFetchStatus();
    this._loginAttempt({ email: emailValue, password: passwordValue, isRemember: isWithCredits });
  }

  _loginAttempt = async requestPayload => {
    const options = {
      method: 'POST',
      body: JSON.stringify(requestPayload),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(AUTH_END_POINT, options);
    const payload = await response.json();

    this._setFetchStatus();
    this._setLoginStatus(payload);
    this._setSession(payload.sessionID);
  }

  _setLoginStatus = payload => {
    const { userLoggedIn: _userLoggedIn } = this.props;

    if (payload.error) {
      this.setState({
        error: payload.error,
        message: payload.message
      });

      return;
    }

    _userLoggedIn();
  }

  _setFetchStatus = () => {
    this.setState(prevState => ({
      isFetch: !prevState.isFetch
    }));
  }

  _setSession = sessionID => {
    const { isWithCredits } = this.state;

    if (!isWithCredits || !sessionID) {
      return;
    }

    sessionStorage.setItem('chatSessionID', sessionID);
  }

  _checkFilledForm = () => {
    const { emailValue, passwordValue } = this.state;

    const isFormFilled = emailValue && emailValue.length !== 0 && (passwordValue && passwordValue.length !== 0);

    return isFormFilled;
  }

  _renderEmailInput = () => {
    const { isFetch, emailValue } = this.state;

    return (
      <div className={styles.container}>
        <label className={`${styles.label} ${styles.labelEmail}`} htmlFor='email' />
        <input
          id='#email'
          className={`${styles.formInput} ${isFetch && styles.formInputDisabled}`}
          onChange={this._handleChange}
          value={emailValue}
          type='email'
          placeholder='your email'
        />
      </div>
    );
  }

  _renderPasswordInput = () => {
    const { isFetch, passwordValue } = this.state;

    return (
      <div className={styles.container}>
        <label className={`${styles.label} ${styles.labelPassword}`} htmlFor='password' />
        <input
          id='#password'
          className={`${styles.formInput} ${isFetch && styles.formInputDisabled}`}
          onChange={this._handleChange}
          value={passwordValue}
          type='password'
          placeholder='your password'
        />
      </div>
    );
  }

  _renderRememberMeField = () => {
    const { isFetch, isWithCredits } = this.state;

    return (
      <div className={`${styles.container} ${styles.rememberContainer}`}>
        <input
          onChange={this._handlerCheck}
          id='checkbox'
          className={`${styles.checkbox} ${isFetch && styles.disabledCursor}`}
          type='checkbox'
          checked={isWithCredits}
        />
        <label htmlFor='checkbox' className={`${styles.labelText} ${isFetch && styles.disabledCursor}`}>
          Remember Me
        </label>
      </div>
    );
  }

  _renderSubmitButton = () => {
    const { isFetch } = this.state;
    const isFormFilled = this._checkFilledForm();

    return (
      <div className={styles.container}>
        <button
          onClick={this._handlerSubmit}
          className={`${styles.formButton} ${isFormFilled && styles.formButtonActive}`}
          type='submit'
        >
          {isFetch ? <span className={`${globalStyles.spinner} ${styles.fetchSpinner}`} /> : 'Log in'}
        </button>
      </div>
    );
  }

  _renderError = () => {
    const { error, message } = this.state;

    if (!error) {
      return null;
    }

    return (
      <span className={styles.error}>{message}</span>
    );
  }

  render() {
    const { messageType } = this.props;

    return (
      <div className={styles.formWrap}>
        <div className={styles.loginHeadline}>
          <span className={styles.headlineText}>{LOGIN_MESSAGES[messageType]}</span>
        </div>
        <form className={styles.form}>
          {this._renderEmailInput()}
          {this._renderPasswordInput()}
          {this._renderRememberMeField()}
          {this._renderSubmitButton()}
          {this._renderError()}
        </form>
      </div>
    );
  }
}

const mapDispatchToState = ({
  userLoggedIn
});

export default connect(null, mapDispatchToState)(Login);
