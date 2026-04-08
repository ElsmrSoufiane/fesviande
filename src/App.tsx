import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import ProductDetailsPage from './pages/ProductDetailsPage'

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
