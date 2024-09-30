import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './mainPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
