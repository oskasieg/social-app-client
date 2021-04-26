import Cookies from 'js-cookie';

export const setCookie = (data: string) => {
  Cookies.set('oskasiegBlogUser', data);
};

export const getCookie = () => {
  const token = Cookies.get('oskasiegBlogUser');
  return token;
};

export const clearCookie = () => {
  Cookies.remove('oskasiegBlogUser');
};
