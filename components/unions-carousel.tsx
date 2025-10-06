"use client"

import { useState, useRef } from "react"

export function UnionsCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const unions = [
    { name: "AEITU - Informática", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AEETU - Electrotecnia", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AEMTU - Mecánica", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AECTU - Construcción", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AEGTU - Gastronomía", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AEATU - Administración", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AELTU - Logística", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AETU - Turismo", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AEQUTU - Química", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AEMATU - Matemática", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AEIDTU - Diseño", logo: "/placeholder.svg?height=80&width=120" },
    { name: "AEARTU - Arte", logo: "/placeholder.svg?height=80&width=120" },
  ]

  const duplicatedUnions = [...unions, ...unions]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            <span className="text-secondary">Gremios</span> Asociados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La CEU está conformada por gremios estudiantiles de todas las especialidades de la UTU.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-6 animate-scroll-unions-smooth"
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedUnions.map((union, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-card rounded-lg hover:shadow-md transition-all duration-300 flex-shrink-0 w-44"
              >
                <img
                  src={union.logo || "/placeholder.svg"}
                  alt={union.name}
                  className="max-h-16 w-auto opacity-70 hover:opacity-100 transition-opacity mb-2"
                />
                <span className="text-xs text-muted-foreground text-center">{union.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-unions-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${unions.length * (176 + 24)}px);
          }
        }
        
        .animate-scroll-unions-smooth {
          animation: scroll-unions-smooth 35s linear infinite;
        }
      `}</style>
    </section>
  )
}
