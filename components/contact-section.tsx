"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
    alert("¡Mensaje enviado correctamente! Te responderemos pronto.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["contacto@ceu-utu.edu.uy", "presidencia@ceu-utu.edu.uy"],
      color: "bg-gray-900",
    },
    {
      icon: Phone,
      title: "Teléfono",
      details: ["+598 2901 8765", "+598 2901 8766 (Secretaría)"],
      color: "bg-gray-700",
    },
    {
      icon: MapPin,
      title: "Dirección",
      details: ["Av. Libertador 1234, Piso 3", "Montevideo, Uruguay", "CP 11100"],
      color: "bg-gray-900",
    },
    {
      icon: Clock,
      title: "Horarios",
      details: ["Lunes a Viernes: 9:00 - 17:00", "Sábados: 9:00 - 13:00"],
      color: "bg-gray-700",
    },
  ]

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">Contáctanos</h2>
          <div className="w-24 h-px bg-gray-900 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Estamos aquí para escucharte. Ponte en contacto con nosotros para cualquier consulta o propuesta
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-light text-gray-900 mb-12">Información de Contacto</h3>
                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-6"
                    >
                      <div
                        className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-gray-900 mb-3">{item.title}</h4>
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 font-light leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-16 p-8 bg-gray-50 rounded-2xl"
                >
                  <h4 className="text-xl font-medium text-gray-900 mb-6">Síguenos</h4>
                  <div className="space-y-4">
                    {[
                      { name: "Facebook", handle: "CEU Uruguay" },
                      { name: "Twitter", handle: "@CEU_Uruguay" },
                      { name: "LinkedIn", handle: "CEU Uruguay" },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 group"
                      >
                        <span className="font-light">
                          {social.name}: {social.handle}
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-12">
                  <h3 className="text-3xl font-light text-gray-900 mb-12">Envíanos un Mensaje</h3>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                          NOMBRE COMPLETO *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre completo"
                          className="border-0 border-b border-gray-200 rounded-none px-0 py-4 text-lg font-light focus:border-gray-900 focus:ring-0"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                          EMAIL *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          className="border-0 border-b border-gray-200 rounded-none px-0 py-4 text-lg font-light focus:border-gray-900 focus:ring-0"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                        ASUNTO *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="¿Sobre qué quieres escribirnos?"
                        className="border-0 border-b border-gray-200 rounded-none px-0 py-4 text-lg font-light focus:border-gray-900 focus:ring-0"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                        MENSAJE *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={6}
                        className="border-0 border-b border-gray-200 rounded-none px-0 py-4 text-lg font-light focus:border-gray-900 focus:ring-0 resize-none"
                      />
                    </div>

                    <div className="pt-8">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-light tracking-wide rounded-2xl transition-all duration-300"
                      >
                        <Send className="mr-3 h-5 w-5" />
                        Enviar Mensaje
                      </Button>
                    </div>
                  </form>

                  <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      <strong className="font-medium">Compromiso:</strong> Respondemos todos los mensajes en un plazo
                      máximo de 48 horas. Para consultas urgentes, puedes llamarnos directamente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
