import Cookies from 'js-cookie';

export const setCookie = (data) => {
  Cookies.set('oskasiegBlogUser', data);
};

export const getCookie = () => {
  const token = Cookies.get('oskasiegBlogUser');
  return token;
};
