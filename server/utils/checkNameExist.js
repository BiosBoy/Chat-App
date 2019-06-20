const checkNameExist = (store, name) => {
  let sameNameFindCounter = 0;

  store.forEach(user => {
    if (user.name === name) {
      sameNameFindCounter += 1;
    }
  });

  const optimizedName = sameNameFindCounter > 0 ? `${name}_${sameNameFindCounter}` : name;

  return optimizedName;
};

module.exports = checkNameExist;
