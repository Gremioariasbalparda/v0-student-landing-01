"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight, Play } from "lucide-react"

export function EventsSection() {
  const events = [
    {
      title: "Congreso Nacional de Estudiantes UTU 2024",
      date: "15-17 Marzo 2024",
      location: "Montevideo, Uruguay",
      participants: "500+ estudiantes",
      image: "/placeholder.svg?height=300&width=500&text=Congreso+Nacional",
      description:
        "El evento más importante del año donde se definieron las políticas estudiantiles para el período 2024-2025.",
      featured: true,
    },
    {
      title: "Feria de Innovación Técnica",
      date: "22-24 Junio 2024",
      location: "Punta del Este",
      participants: "300+ estudiantes",
      image: "/placeholder.svg?height=300&width=500&text=Feria+Innovación",
      description:
        "Estudiantes de todo el país presentaron sus proyectos innovadores en tecnología y ciencias aplicadas.",
    },
    {
      title: "Encuentro Regional Norte",
      date: "10-12 Agosto 2024",
      location: "Salto, Uruguay",
      participants: "200+ estudiantes",
      image: "/placeholder.svg?height=300&width=500&text=Encuentro+Regional",
      description: "Encuentro regional que fortaleció los lazos entre los gremios estudiantiles del norte del país.",
    },
  ]

  return (
    <section id="eventos" className="py-32 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            Eventos Destacados
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 text-balance">
            Construyendo comunidad
            <span className="block text-blue-600 font-normal">evento a evento</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-pretty leading-relaxed">
            Conoce los principales eventos que organizamos para fortalecer la comunidad estudiantil de la UTU.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {/* Evento destacado */}
          <Card className="border-0 shadow-sm bg-white overflow-hidden hover-lift">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <img
                  src={events[0].image || "/placeholder.svg"}
                  alt={events[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Evento Principal
                  </span>
                </div>
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                    <Play className="h-6 w-6 text-gray-900 ml-1" />
                  </div>
                </button>
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-sm text-blue-600 font-medium mb-2">{events[0].date}</div>
                <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4 text-balance">{events[0].title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{events[0].description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-3" />
                    {events[0].location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-3" />
                    {events[0].participants}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-fit border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent"
                >
                  Ver detalles completos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>

          {/* Eventos secundarios */}
          <div className="grid md:grid-cols-2 gap-8">
            {events.slice(1).map((event, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white overflow-hidden hover-lift group">
                <div className="relative aspect-[16/10]">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-sm font-medium mb-1">{event.date}</div>
                    <h4 className="text-white text-lg font-semibold text-balance">{event.title}</h4>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {event.participants}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 h-auto">
            Ver todos nuestros eventos
            <Calendar className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
