import { put } from 'redux-saga/effects'

import { userLoggedIn } from '../actions/users'

import { AUTH_END_POINT } from '../../constants/API'

function* checkAuth() {
  const res = yield fetch(AUTH_END_POINT, {
    method: 'POST',
    body: JSON.stringify({ sessionID: sessionStorage.getItem('chatSessionID') }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = yield res.json()

  console.log(res, data, 'test')

  if (!data.error) {
    yield put(userLoggedIn())
  }
}

export default checkAuth
