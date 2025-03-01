import { Toaster } from 'sonner'
import './App.css'
import SecretaryPage from './admin/SecretaryPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import StudentPage from './student/StudentPage'
import LoginPage from './admin/LoginPage'
import ProtectedRoute from './utility/ProtectedRoute'

function App() {
  return (
      <>
          <BrowserRouter>
              <div>
                  <Routes>
                      <Route path="/" element={<Navigate to="/student" replace />} />
                      <Route path="/student/*" element={<StudentPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route
                            path="/admin/*"
                            element={
                                <ProtectedRoute>
                                    <SecretaryPage />
                                </ProtectedRoute>
                            }
                        />
                  </Routes>
              </div>
          </BrowserRouter>
          <Toaster position='top-right' theme='dark' duration={3000}/>
      </>
  );
}

export default App
