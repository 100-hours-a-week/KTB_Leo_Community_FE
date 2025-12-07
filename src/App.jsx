import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PostListPage from './pages/PostListPage'
import PostDetailPage from './pages/PostDetailPage'
import PostEditPage from './pages/PostEditPage'
import ProfileEditPage from './pages/ProfileEditPage'
import PasswordEditPage from './pages/PasswordEditPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/posts" element={<PostListPage />} />
                <Route path="/posts/create" element={<PostEditPage />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route path="/posts/:id/edit" element={<PostEditPage />} />
                <Route path="/profile/edit" element={<ProfileEditPage />} />
                <Route path="/profile/password" element={<PasswordEditPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
