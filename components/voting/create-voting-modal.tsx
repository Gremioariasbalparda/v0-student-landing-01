"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CreateVotingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  userGroups: string[]
}

export function CreateVotingModal({ isOpen, onClose, onSubmit, userGroups }: CreateVotingModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    group: "",
    mode: "public_realtime" as "public_realtime" | "secret_delayed",
    revealAt: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.text || !formData.group) {
      alert("Complete título, texto y grupo")
      return
    }

    const submitData = {
      ...formData,
      revealAt: formData.mode === "secret_delayed" && formData.revealAt ? new Date(formData.revealAt).getTime() : null,
    }

    onSubmit(submitData)
    setFormData({
      title: "",
      text: "",
      group: "",
      mode: "public_realtime",
      revealAt: "",
    })
  }

  const handleClose = () => {
    setFormData({
      title: "",
      text: "",
      group: "",
      mode: "public_realtime",
      revealAt: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear nueva votación</DialogTitle>
          <DialogDescription>Complete los datos para crear una nueva votación para su grupo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Título de la votación"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="text">Texto / resolución</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="Descripción detallada de la votación"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="group">Grupo</Label>
            <Select value={formData.group} onValueChange={(value) => setFormData({ ...formData, group: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un grupo" />
              </SelectTrigger>
              <SelectContent>
                {userGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mode">Modo</Label>
            <Select value={formData.mode} onValueChange={(value: any) => setFormData({ ...formData, mode: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public_realtime">Pública (tiempo real)</SelectItem>
                <SelectItem value="secret_delayed">Secreta (revelación diferida)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.mode === "secret_delayed" && (
            <div className="space-y-2">
              <Label htmlFor="revealAt">Revelar en (fecha y hora)</Label>
              <Input
                id="revealAt"
                type="datetime-local"
                value={formData.revealAt}
                onChange={(e) => setFormData({ ...formData, revealAt: e.target.value })}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Crear votación</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
