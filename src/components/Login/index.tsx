import React from 'react';

import { IProps, IState, TInputsValues } from './interfaces';

import globalStyles from '../../styles/index.scss';
import styles from './index.scss';

const LOGIN_MESSAGES = {
  notLogged: 'You\'re not logged :( Please make a sign in.'
};

class Login extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isFetch: false,
      isWithCredits: false,
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
    this.setState(prevState => ({
      isWithCredits: !prevState.isWithCredits
    }));
  }

  _handlerSubmit = e => {
    e.preventDefault();

    this.setState({
      isFetch: true
    });
  }

  _checkFilledForm = () => {
    const { emailValue, passwordValue } = this.state;

    const isFormFilled = emailValue && emailValue.length !== 0 && (passwordValue && passwordValue.length !== 0);

    return isFormFilled;
  }

  _renderEmailInput = () => {
    const { emailValue } = this.state;

    return (
      <div className={styles.container}>
        <label className={`${styles.label} ${styles.labelEmail}`} htmlFor='email' />
        <input
          id='#email'
          className={styles.formInput}
          onChange={this._handleChange}
          value={emailValue}
          type='email'
          placeholder='your email'
        />
      </div>
    );
  }

  _renderPasswordInput = () => {
    const { passwordValue } = this.state;

    return (
      <div className={styles.container}>
        <label className={`${styles.label} ${styles.labelPassword}`} htmlFor='password' />
        <input
          id='#password'
          className={styles.formInput}
          onChange={this._handleChange}
          value={passwordValue}
          type='password'
          placeholder='your password'
        />
      </div>
    );
  }

  _renderRememberMeField = () => {
    const { isWithCredits } = this.state;

    return (
      <div className={`${styles.container} ${styles.rememberContainer}`}>
        <input
          onChange={this._handlerCheck}
          id='checkbox'
          className={styles.checkbox}
          type='checkbox'
          checked={isWithCredits}
        />
        <label htmlFor='checkbox' className={styles.labelText}>
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
        </form>
      </div>
    );
  }
}

export default Login;
