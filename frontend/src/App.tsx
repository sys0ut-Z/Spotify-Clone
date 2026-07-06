import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { AuthenticateWithRedirectCallback } from '@clerk/react';
import MainLayout from './layout/MainLayout';
import ChatPage from './pages/chat/ChatPage';
import AlbumPage from './pages/album/AlbumPage';
import AdminPage from './pages/admin/AdminPage';
import { Toaster } from 'react-hot-toast';
import AuthSync from './components/AuthSync';

function App(){
  return (
    <>
      <Toaster />
      <AuthSync />
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;