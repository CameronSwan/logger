import React from 'react';
import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import Main from './components/Main';
import Register from './components/Register';
import LogIn from './components/LogIn';
import PrivacyPolicy from './components/PrivacyPolicy';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <div id="main-content">
          <Routes>
            <Route path='/' element={ <Main /> }/>
            <Route path='/register' element={ <Register />}/>
            <Route path='/login' element={ <LogIn />}/>
            <Route path='/privacypolicy' element={ <PrivacyPolicy />}/>
            {/* <Route element={<ProtectedRoutes/>}>
            </Route> */}
            <Route path='*' element= {< NotFound />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

const NotFound = () => {
  return <h1>Page Not Found</h1>
}

export default App;
