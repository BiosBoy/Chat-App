const normalizeTypingUsers = (data, getState) => {
  const { currentUser: { cookie } = {} } = getState();

  const currentUserInTypingList = () => {
    return data.typingUsers.some(user => user.cookie === cookie);
  };

  if (currentUserInTypingList()) {
    data.typingUsers.splice(
      0,
      data.typingUsers.length,
      ...data.typingUsers.filter(user => user.cookie !== cookie)
    );
  }
};

export default normalizeTypingUsers;
