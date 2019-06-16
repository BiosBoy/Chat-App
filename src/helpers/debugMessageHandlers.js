const userDisconnected = {
  message: 'You\'re disconnected due to the non-activity! Refresh the page to restart, please.',
  type: 'error',
  classNames: 'errorText',
  isCloseButton: true,
  button: {
    active: true,
    type: 'link',
    href: document.location.href,
    buttonClass: '',
    target: '_self',
    buttonText: 'Reload'
  }
};

const userIsNotConnected = {
  message: 'You\'re still don\'t connected to the server. Doing my best...',
  type: 'info',
  classNames: 'infoText',
  showSpinner: true
};

export default {
  userDisconnected,
  userIsNotConnected
};
