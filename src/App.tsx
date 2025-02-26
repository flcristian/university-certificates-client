import { Toaster } from 'sonner'
import './App.css'
import SecretaryPage from './admin/SecretaryPage'

function App() {
  return (
    <>
      <SecretaryPage/>
      <Toaster position='top-right' theme='dark' duration={3000}/>
    </>
  )
}

export default App
