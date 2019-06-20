const debounce = (functions, params) => {
  let timer = null;
  const { common: { delay } } = params;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      functions.forEach((func, index) => func.call(this, ...params[index]));

      timer = null;
    }, delay);
  };
};

module.exports = debounce;
