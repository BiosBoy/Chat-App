export interface IProps {
  userLoggedIn: () => void
  messageType: string
}

export interface IState {
  isClosed?: boolean
  isFetch: boolean
  isWithCredits: boolean
  error: boolean
  message: string
  emailValue: string
  passwordValue: string
}

export type TInputsValues = 'passwordValue' | 'emailValue'
