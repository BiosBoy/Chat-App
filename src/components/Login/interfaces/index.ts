export interface IProps {
  messageType: string
}

export interface IState {
  isFetch: boolean
  isWithCredits: boolean
  emailValue: string
  passwordValue: string
}

export type TInputsValues = 'passwordValue' | 'emailValue';
