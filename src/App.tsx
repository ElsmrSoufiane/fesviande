import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import DataEditor from './pages/DataEditor'
import FullPreview from './pages/FullPreview'
import LoginPage from './pages/LoginPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  
  if (!isAdmin) {
    return <Navigate to="/admin" replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/admin" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DataEditor />
            </ProtectedRoute>
          } />
          <Route path="/preview" element={
            <ProtectedRoute>
              <FullPreview />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
