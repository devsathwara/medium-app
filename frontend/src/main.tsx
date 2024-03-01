// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <App />
</CookiesProvider>
)
