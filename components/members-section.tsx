"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"

export function MembersSection() {
  const members = [
    {
      name: "María González",
      role: "Presidenta CEU",
      quote:
        "Nuestra misión es asegurar que cada estudiante de la UTU tenga las herramientas necesarias para construir su futuro profesional con dignidad y excelencia.",
      image: "/placeholder.svg?height=80&width=80&text=MG",
    },
    {
      name: "Carlos Rodríguez",
      role: "Vicepresidente",
      quote:
        "La educación técnica es el motor del desarrollo del país. Trabajamos para que sea accesible, de calidad y conectada con las necesidades reales del mercado laboral.",
      image: "/placeholder.svg?height=80&width=80&text=CR",
    },
    {
      name: "Ana Martínez",
      role: "Secretaria General",
      quote:
        "La participación estudiantil es fundamental para una educación democrática. Cada voz cuenta y cada opinión es valiosa en la construcción de nuestro futuro educativo.",
      image: "/placeholder.svg?height=80&width=80&text=AM",
    },
    {
      name: "Diego Fernández",
      role: "Coordinador de Comunicaciones",
      quote:
        "Mantenemos informada a toda la comunidad estudiantil porque creemos que la información es poder y el poder debe estar en manos de los estudiantes.",
      image: "/placeholder.svg?height=80&width=80&text=DF",
    },
  ]

  return (
    <section id="members" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Visión de Nuestros
            <span className="block font-medium">Miembros</span>
          </h2>
          <div className="w-24 h-px bg-gray-900 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Las perspectivas y compromisos de quienes lideran la representación estudiantil de la UTU
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-none bg-transparent group hover:bg-gray-50/50 transition-all duration-500">
                  <CardContent className="p-12">
                    <div className="flex items-start space-x-6">
                      <div className="relative">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover bg-gray-100 ring-1 ring-gray-200"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Quote className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-6">
                          <h3 className="text-2xl font-medium text-gray-900 mb-1">{member.name}</h3>
                          <p className="text-gray-500 font-light tracking-wide text-sm uppercase">{member.role}</p>
                        </div>
                        <blockquote className="text-gray-700 text-lg leading-relaxed font-light italic">
                          "{member.quote}"
                        </blockquote>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-3xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            <div className="relative">
              <h3 className="text-4xl font-light text-white mb-6">Únete a Nuestro Equipo</h3>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
                La CEU siempre está abierta a nuevos miembros comprometidos con la causa estudiantil
              </p>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="text-5xl font-light text-white mb-2">15</div>
                  <div className="text-gray-400 font-light tracking-wide">Miembros activos</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-light text-white mb-2">12</div>
                  <div className="text-gray-400 font-light tracking-wide">Gremios representados</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-light text-white mb-2">3</div>
                  <div className="text-gray-400 font-light tracking-wide">Años de experiencia promedio</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
