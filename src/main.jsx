
/* Enterprise codebases follow a strict import order */

// 1. React core
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 2. Third-party libraries
import { BrowserRouter } from 'react-router-dom'

// 3. Internal / local
import { AuthProvider } from './contexts/AuthContext'
import App from './App'

// 4. Styles (always last)
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
