import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

import { useAuth0 } from "@auth0/auth0-react";

import Header from "./components/Header/Header";

import Main from './views/Main'
import New from './views/New'
import Error404 from './views/Error404'
import Login from './views/Login/Login'
import Flow from './views/Flow'

import './App.scss'

function App() {
  const { isAuthenticated, user, error } = useAuth0();

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <BrowserRouter>
          {isAuthenticated && <Header />}
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/flows"/> : <Navigate to="/login"/>
            }/>
            <Route path="/flows" element={
              isAuthenticated? <Main /> : <Navigate to="/login"/>
            }/>
            <Route path="/new" element={
              isAuthenticated? <New /> : <Navigate to="/login"/>
            }/>
            <Route path="/flows/:id" element={
              isAuthenticated? <Flow /> : <Navigate to="/flows"/>
            }/>
            <Route path="/flows/:id/edit" element={
              isAuthenticated? <New /> : <Navigate to="/flows"/>
            }/>
            <Route path="/login" element={
              !isAuthenticated? <Login /> : <Navigate to="/flows"/>
            }/>
            <Route path="/register" element={
              !isAuthenticated ? <Login register={true}/> : <Navigate to="/flows"/>
            }/>
            <Route path="*" element={
              isAuthenticated? <Error404 /> : <Navigate to="/login"/>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </I18nextProvider>
  )
}

export default App
