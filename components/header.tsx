"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-sm"></div>
              <span
                className={`text-2xl font-light tracking-tight transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                CEU
              </span>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {["Nosotros", "Objetivos", "Eventos", "Miembros", "Contacto"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-100 ${
                    isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <Button
              asChild
              variant="outline"
              size="sm"
              className={`border transition-all duration-300 font-medium tracking-wide ${
                isScrolled
                  ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-gray-900"
              }`}
            >
              <a href="/login">Iniciar Sesión</a>
            </Button>

            <button
              className={`lg:hidden ml-4 transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-lg">
            <div className="container-custom py-8 space-y-6">
              {["Nosotros", "Objetivos", "Eventos", "Miembros", "Contacto"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-700 hover:text-gray-900 text-sm font-medium tracking-wide transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium tracking-wide bg-transparent"
              >
                <a href="/login">Iniciar Sesión</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
