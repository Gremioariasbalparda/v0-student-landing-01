"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("nosotros")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/estudiantes-ceu-hero.jpg"
          alt="Estudiantes de la Universidad del Trabajo del Uruguay"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"></div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-5xl px-6 fade-in">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium tracking-wide border border-white/20">
              Universidad del Trabajo del Uruguay
            </span>
          </div>

          <h1 className="text-white text-balance leading-none mb-8 font-light">
            Coordinadora de
            <br />
            <span className="text-white font-normal">Estudiantes</span>
          </h1>

          <p className="text-xl text-white/90 text-balance max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Representamos y defendemos los derechos de más de 15,000 estudiantes. Construyendo el futuro de la educación
            técnica en Uruguay.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 font-medium tracking-wide px-8 py-4 h-auto"
              onClick={scrollToNext}
            >
              Conocer Más
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent font-medium tracking-wide px-8 py-4 h-auto"
            >
              Únete a Nosotros
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors group"
        >
          <span className="text-xs font-medium tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            SCROLL
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
