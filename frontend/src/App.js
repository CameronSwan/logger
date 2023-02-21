import React from 'react';
import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import Main from './components/Main';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <div id="main-content">
          <Routes>
            <Route path='/' element={ <Main /> }/>
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
