import { Toaster } from 'sonner'
import './App.css'
import SecretaryPage from './admin/SecretaryPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CertificateRequestPage from './student/certificate-request/CertificateRequestPage'
import CertificateTemplatePage from './admin/certificate-templates/CertificateTemplatePage'
import RegisterEntriesPage from './admin/register-entries/RegisterEntriesPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<CertificateRequestPage />} />
            <Route path="/admin" element={<SecretaryPage page={CertificateTemplatePage} />} />
            <Route path="/admin/certificate-templates" element={<SecretaryPage page={CertificateTemplatePage} />} />
            <Route path="/admin/register-entries" element={<SecretaryPage page={RegisterEntriesPage} />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Toaster position='top-right' theme='dark' duration={3000}/>
    </>
  )
}

export default App
