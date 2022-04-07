import 'antd/dist/antd.css'
import React, { useState } from 'react';
import Auth from '../auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ptotectedRoute/ProtectedRoute';
import Main from '../main/Main';
import styles from './app.module.css'
import { UserContext } from '../context/UserContext';

const App: React.FC = (): JSX.Element => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<string>('');

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Auth setLoggedIn={setLoggedIn} setUserInfo={setUserInfo} />} />
          <Route element={<ProtectedRoute isAuth={loggedIn} />}>
            <Route path='/' element={<UserContext.Provider value={userInfo}><Main /></UserContext.Provider>} />
          </Route>
          <Route>
        </Route>
          <Route path="*" element={<p className={styles.pageError}>Страница не найдена :(</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
