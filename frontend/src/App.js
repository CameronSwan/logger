import React from 'react';
import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import Main from './components/Main';
import Register from './components/Register';
import LogIn from './components/LogIn';
<<<<<<< HEAD
import CommunityGuidelines from './components/CommunityGuidelines';
=======
import ProtectedRoutes from './components/ProtectedRoutes';
import CreateBowelMovement from './components/CreateBowelMovement';
>>>>>>> fdd717b79a3a2a46750bf7b4972cf9257e1edd53

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
<<<<<<< HEAD
            <Route path='/communityguidelines' element={ <CommunityGuidelines />}/>
            {/* <Route element={<ProtectedRoutes/>}>
            </Route> */}
=======
            <Route element={<ProtectedRoutes/>}>
              <Route path="/bowelmovement/create" element={<CreateBowelMovement/>}/>
            </Route>
>>>>>>> fdd717b79a3a2a46750bf7b4972cf9257e1edd53
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
