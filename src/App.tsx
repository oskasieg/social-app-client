import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Register from './containers/Register/Register';
import LoginForm from './components/LoginForm/LoginForm';
import { useDispatch } from 'react-redux';
import { getProfileAction } from './containers/Profile/actions';
import { getCookie } from './lib/cookie';
import Posts from './containers/Posts/Posts';
import history from './lib/history';
import Profile from './containers/Profile/Profile';
import EditProfile from './containers/Profile/EditProfile/EditProfile';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import PostForm from './components/PostForm/PostForm';
import OtherProfile from './containers/Profile/OtherProfile/OtherProfile';
import ManagePosts from './containers/Posts/ManagePosts/ManagePosts';
import EditPost from './containers/Posts/EditPost/EditPost';

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
      <ReactNotification isMobile={true} />
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path='/' component={Posts} />

          <Route exact path='/profile' component={Profile} />
          <Route path='/profile/edit' component={EditProfile} />
          <Route path='/profile/:login' component={OtherProfile} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={LoginForm} />

          <Route path='/posts' component={ManagePosts} />
          <Route path='/post/add' component={PostForm} />
          <Route path='/post/edit/:title' component={EditPost} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
