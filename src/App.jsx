import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

import { useUser } from "./context/UserContext";

import Header from "./components/Header/Header";

import Main from './views/Main'
import New from './views/New'
import Error404 from './views/Error404'
import Login from './views/Login'
import Flow from './views/Flow'

import './App.scss'

function App() {

  const {loggedInUser} = useUser()

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <BrowserRouter>
          {loggedInUser && <Header />}
          <Routes>
            <Route path="/" element={
              loggedInUser ? <Navigate to="/flows"/> : <Navigate to="/login"/>
            }/>
            <Route path="/flows" element={
              loggedInUser? <Main /> : <Navigate to="/login"/>
            }/>
            <Route path="/new" element={
              loggedInUser? <New /> : <Navigate to="/login"/>
            }/>
            <Route path="/flows/:id" element={
              loggedInUser? <Flow /> : <Navigate to="/flows"/>
            }/>
            <Route path="/flows/:id/edit" element={
              loggedInUser? <New /> : <Navigate to="/flows"/>
            }/>
            <Route path="/login" element={
              !loggedInUser? <Login /> : <Navigate to="/flows"/>
            }/>
            <Route path="*" element={
              loggedInUser? <Error404 /> : <Navigate to="/login"/>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </I18nextProvider>
  )
}

export default App
