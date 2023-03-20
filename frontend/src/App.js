import React from 'react';
import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import Main from './components/Main';
import Register from './components/Register';
import LogIn from './components/LogIn';
import CommunityGuidelines from './components/CommunityGuidelines';
import TermsOfService from './components/TermsOfService';
import ProtectedRoutes from './components/ProtectedRoutes';
import CreateBowelMovement from './components/CreateBowelMovement';
import EditBowelMovement from './components/EditBowelMovement';
import ViewBowelMovement from './components/ViewBowelMovement';
import History from './components/History';
import Analysis from './components/Analysis';
import Community from './components/Community';
import Info from './components/Info';


const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <div id="main-content">
          <Routes>
            <Route path='/register' element={ <Register />}/>
            <Route path='/login' element={ <LogIn />}/>
            <Route path='/termsofservice' element={ <TermsOfService />}/>
            <Route path='/communityguidelines' element={<CommunityGuidelines />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Main />} />
              <Route path='/info' element={<Info />} />
              <Route path='/community' element={<Community />} />
              <Route path='/bowelmovement/create' element={<CreateBowelMovement />} />
              <Route path='/bowelmovement/edit/:id' element={<EditBowelMovement />} />
              <Route path='/bowelmovement/:id' element={<ViewBowelMovement />} />
              <Route path='/bowelmovement/history' element={<History />} />
              <Route path='/bowelmovement/analysis' element={<Analysis />} />
            </Route>
            <Route path='*' element={< NotFound />} />
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
