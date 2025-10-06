"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Megaphone, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="nosotros" className="py-32 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Quiénes Somos
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 text-balance">
            La voz de más de
            <span className="block text-blue-600 font-normal">15,000 estudiantes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-pretty leading-relaxed">
            La Coordinadora de Estudiantes de la Universidad del Trabajo del Uruguay representa y defiende los intereses
            de todos los estudiantes de educación técnica del país.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              icon: BookOpen,
              title: "Educación de Excelencia",
              description: "Promovemos una educación técnica de la más alta calidad, actualizada y relevante.",
            },
            {
              icon: Users,
              title: "Representación Activa",
              description: "Somos la voz oficial de los estudiantes en todas las instancias de decisión.",
            },
            {
              icon: Megaphone,
              title: "Defensa de Derechos",
              description: "Protegemos y promovemos los derechos estudiantiles sin distinción.",
            },
            {
              icon: Heart,
              title: "Solidaridad",
              description: "Fomentamos la solidaridad y el apoyo mutuo en la comunidad educativa.",
            },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="border-0 shadow-none hover-lift group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-50 transition-colors">
                    <Icon className="h-8 w-8 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-600 mb-6">
              Nuestra Historia
            </div>
            <h3 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 text-balance">
              Construyendo el futuro de la
              <span className="text-blue-600"> educación técnica</span>
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Fundada con la visión de unificar la voz estudiantil de la UTU, la CEU ha sido protagonista en las
                principales transformaciones de la educación técnica en Uruguay.
              </p>
              <p>
                Desde nuestros inicios, trabajamos incansablemente para mejorar las condiciones de estudio, ampliar
                oportunidades educativas y fortalecer el vínculo entre la educación técnica y el mundo laboral.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-8 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent"
            >
              Conocer más sobre nosotros
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/placeholder.svg?height=400&width=500&text=Historia+CEU"
                alt="Historia de la CEU"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-2xl opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
