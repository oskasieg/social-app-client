import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Register from './containers/Register/Register';
import LoginForm from './components/LoginForm/LoginForm';
import { useDispatch } from 'react-redux';
import { getProfileAction } from './containers/Profile/actions';
import { getCookie } from './lib/cookie';

const App = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    const cookieExist = getCookie();

    if (cookieExist) {
      const cookie = JSON.parse(getCookie());
      dispatcher(getProfileAction(cookie.login, cookie.token));
    }
  }, [dispatcher]);

  return (
    <div className={styles.App}>
      <Router>
        <Header />
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={LoginForm} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
