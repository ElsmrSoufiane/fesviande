import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Lock } from 'lucide-react'
import { useState } from 'react'
import { brand, navLinks } from '@/data/data'

export function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-sidebar text-sidebar-foreground sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">{brand.shortName}</span>
            </div>
            <span className="font-bold text-lg tracking-tight">{brand.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href ? 'text-primary' : 'text-sidebar-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="flex items-center gap-1 text-sm font-medium text-sidebar-foreground/60 hover:text-primary transition-colors"
            >
              <Lock className="w-4 h-4" />
              Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="md:hidden p-2 hover:bg-sidebar-accent rounded-full transition-colors"
            >
              <Lock className="w-5 h-5" />
            </Link>
            <button
              className="md:hidden p-2 hover:bg-sidebar-accent rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-sidebar-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href ? 'text-primary' : 'text-sidebar-foreground/80'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="block py-2 text-sm font-medium text-sidebar-foreground/60 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Connexion Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
