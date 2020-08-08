import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const forwardTo = (path: string) => {
  history.push(path);
};

export default history;
