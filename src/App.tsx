import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Register from './containers/Register/Register';
import LoginForm from './components/LoginForm/LoginForm';
import { useDispatch } from 'react-redux';
import { getProfileAction } from './containers/Profile/actions';
import { getCookie } from './lib/cookie';
import MainPage from './components/MainPage/MainPage';
import history from './lib/history';
import Profile from './containers/Profile/Profile';
import EditProfile from './containers/Profile/EditProfile/EditProfile';

const App = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    const cookieExist = getCookie();

    if (cookieExist) {
      const cookie = JSON.parse(getCookie() || '');
      dispatcher(getProfileAction(cookie.login, cookie.token));
    }
  }, [dispatcher]);

  return (
    <div className={styles.App}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/profile/edit' component={EditProfile} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={LoginForm} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
