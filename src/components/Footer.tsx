import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">VF</span>
            </div>
            <span className="font-bold text-lg tracking-tight">VIANDE FES</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link to="/" className="hover:text-primary transition-colors">
              Produits
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              À Propos
            </Link>
          </nav>

          {/* Contact */}
          <div className="text-sm text-sidebar-foreground/70">
            <span className="hover:text-primary transition-colors cursor-pointer">
              Contact
            </span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sidebar-border text-center text-sm text-sidebar-foreground/50">
          <p>&copy; {new Date().getFullYear()} Viande Fes. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
