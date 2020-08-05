import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Register from './containers/Register/Register';

const App = () => {
  return (
    <div className={styles.App}>
      <Router>
        <Header />
        <Switch>
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
