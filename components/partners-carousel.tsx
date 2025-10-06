"use client"

import { useState, useRef } from "react"

export function PartnersCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const partners = [
    { name: "Ministerio de Educación", logo: "/logo-ministerio-educaci-n-uruguay-oficial.jpg" },
    { name: "ANEP", logo: "/logo-anep-uruguay-educaci-n.jpg" },
    { name: "INEFOP", logo: "/logo-inefop-uruguay-capacitaci-n.jpg" },
    { name: "Cámara de Industrias", logo: "/logo-c-mara-industrias-uruguay.jpg" },
    { name: "Banco República", logo: "/logo-banco-rep-blica-uruguay.jpg" },
    { name: "UTE", logo: "/placeholder.svg?height=80&width=120" },
    { name: "ANCAP", logo: "/placeholder.svg?height=80&width=120" },
    { name: "OSE", logo: "/placeholder.svg?height=80&width=120" },
  ]

  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Nuestros <span className="text-primary">Socios</span> Estratégicos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trabajamos junto a importantes instituciones para fortalecer la educación técnica en Uruguay.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-8 animate-scroll-smooth"
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-card rounded-lg hover:shadow-md transition-all duration-300 flex-shrink-0 w-48"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-h-16 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${partners.length * (192 + 32)}px);
          }
        }
        
        .animate-scroll-smooth {
          animation: scroll-smooth 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
