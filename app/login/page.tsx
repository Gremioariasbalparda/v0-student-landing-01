"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type LoginApiResponse = {
  success: boolean
  message?: string
  // opcionales si tu endpoint los devuelve
  role?: string
  name?: string
  groups?: string[] | Record<string, unknown> | null
}

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      const saved = localStorage.getItem("voting_persist_user")
      if (saved) {
        setUsername(saved)
        setRemember(true)
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const showError = (msg: string) => {
    setError(msg)
    setTimeout(() => setError(""), 5000)
  }

  // --- VERIFICACIÓN CONTRA BD (mismo componente) ---
  // Este método llama a tu endpoint PHP (login_check.php) que valida en MySQL.
  const authWithDB = async (user: string, pass: string): Promise<LoginApiResponse> => {
    // Construimos el body como x-www-form-urlencoded para PHP
    const body = new URLSearchParams({ username: user, password: pass }).toString()

    // Timeout manual para evitar bloqueos si el host no responde
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 15000) // 15s

    try {
      const res = await fetch("/login_check.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body,
        signal: ctrl.signal,
      })

      clearTimeout(t)

      if (!res.ok) {
        return { success: false, message: `Error de red (${res.status})` }
      }

      const data = (await res.json()) as LoginApiResponse

      // Normalizamos respuesta mínima esperada
      if (typeof data?.success !== "boolean") {
        return { success: false, message: "Respuesta inválida del servidor" }
      }

      return data
    } catch (e: unknown) {
      clearTimeout(t)
      const msg =
        e instanceof Error
          ? (e.name === "AbortError" ? "Tiempo de espera agotado" : e.message)
          : "Error de conexión"
      return { success: false, message: msg }
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!username.trim() || !password) {
      showError("Complete usuario y contraseña.")
      setIsLoading(false)
      return
    }

    // --- Llamada a la verificación de BD ---
    const result = await authWithDB(username.trim(), password)

    if (!result.success) {
      showError(result.message || "Usuario o contraseña incorrectos.")
      setIsLoading(false)
      return
    }

    try {
      if (remember) {
        localStorage.setItem("voting_persist_user", username)
      }

      // Guardamos datos de sesión (rol/nombre/grupos si el backend los envía)
      sessionStorage.setItem("votingUser", username)
      sessionStorage.setItem("votingRole", (result.role || "user") as string)
      sessionStorage.setItem("votingName", (result.name || username) as string)

      const groups =
        Array.isArray(result.groups) || typeof result.groups === "object"
          ? JSON.stringify(result.groups)
          : JSON.stringify([])
      sessionStorage.setItem("votingGroups", groups)

      // Redirigir al sistema de votación
      router.push("/voting")
    } catch {
      showError("Error de sesión. Permisos de almacenamiento denegados.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="inline-flex items-center text-sm text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver al inicio
        </Link>
      </div>

      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center text-teal-900">
              <Shield className="w-7 h-7 font-bold" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 leading-tight">Acceso Seguro — VotingSphere</h1>
              <p className="text-sm text-slate-500 mt-1">
                Inicie sesión con credenciales institucionales. (ambiente de prueba)
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs text-slate-600 font-medium">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs text-slate-600 font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                />
                <Label htmlFor="remember" className="text-xs text-slate-600">
                  Mantener sesión
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-teal-600 hover:bg-teal-700 text-teal-50 font-bold px-6 py-2.5 rounded-lg"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">Contacto: soporte@ceu.example · Política de seguridad interna</p>
          </div>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 right-4 max-w-xs">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Credenciales de prueba:</h3>
            <div className="text-xs text-slate-300 space-y-1">
              <div>
                <strong>admin</strong> / admin123
              </div>
              <div>
                <strong>user1</strong> / user1pass
              </div>
              <div>
                <strong>user2</strong> / user2pass
              </div>
              <div>
                <strong>user3</strong> / user3pass
              </div>
              <div>
                <strong>user4</strong> / user4pass
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
