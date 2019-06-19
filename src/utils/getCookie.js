const getCookie = name => {
  const cookieNormalizer = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');
  const cookieRegExp = new RegExp(`(?:^|; )${cookieNormalizer}=([^;]*)`);
  const matches = document.cookie.match(cookieRegExp);

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export default getCookie;

