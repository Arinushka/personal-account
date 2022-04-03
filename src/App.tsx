
import './App.css';
import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ContactList from './components/ContactList';
import ProtectedRoute from './components/ProtectedRoute';



const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);


  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          {/* <Route path='/signin' element={<Auth setLoggedIn={setLoggedIn} />} />
          <Route element={<ProtectedRoute isAuth={loggedIn} />}> */}
            <Route path='/' element={<ContactList />} />
          {/* </Route> */}

          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
