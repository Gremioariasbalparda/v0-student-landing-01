"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Vote, LogOut, Plus, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { CreateVotingModal } from "./create-voting-modal"
import { VotingDetail } from "./voting-detail"

// Tipos
interface Voting {
  id: string
  title: string
  text: string
  group: string
  mode: "public_realtime" | "secret_delayed"
  createdBy: string
  createdAt: number
  votes: { yes: number; no: number; abs: number }
  votesByUser: Record<string, "yes" | "no" | "abs">
  status: "active" | "final"
  revealed: boolean
  revealAt: number | null
  logs: Array<{ actor: string; action: string; ts: number }>
  document?: { body: string; font: string; fontSize: number }
  attachment?: { dataUrl: string; name: string }
  manualAdds?: { yes: number; no: number; abs: number }
}

interface UserMeta {
  name: string
  groups: string[]
  isAdmin: boolean
}

// Credenciales y configuración
const CREDENTIALS = {
  users: {
    admin: { name: "Administrador CEU", groups: ["GAB", "AECOS", "AEITU", "AEETU"], role: "admin" },
    estudiante1: { name: "Juan Pérez", groups: ["AEITU"], role: "user" },
    estudiante2: { name: "María González", groups: ["AECOS", "GAB"], role: "user" },
    delegado1: { name: "Carlos Rodríguez", groups: ["AEETU", "GAB"], role: "user" },
  },
}

const STORAGE_KEY = "votings_v4"

export function VotingDashboard() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string>("")
  const [userMeta, setUserMeta] = useState<UserMeta | null>(null)
  const [votings, setVotings] = useState<Voting[]>([])
  const [selectedVoting, setSelectedVoting] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Inicialización
  useEffect(() => {
    const user = sessionStorage.getItem("votingUser")
    if (!user) {
      router.push("/login")
      return
    }

    const userData = CREDENTIALS.users[user as keyof typeof CREDENTIALS.users]
    if (!userData) {
      alert("Usuario no configurado")
      sessionStorage.clear()
      router.push("/login")
      return
    }

    setCurrentUser(user)
    setUserMeta({
      name: userData.name,
      groups: userData.groups,
      isAdmin: userData.role === "admin",
    })

    loadVotings()
  }, [router])

  const loadVotings = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        const sampleData = initSampleData()
        setVotings(sampleData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ votings: sampleData }))
      } else {
        const parsed = JSON.parse(stored)
        setVotings(parsed.votings || [])
      }
    } catch (error) {
      console.error("Error loading votings:", error)
      const sampleData = initSampleData()
      setVotings(sampleData)
    }
  }

  const initSampleData = (): Voting[] => {
    const now = Date.now()
    return [
      {
        id: "v-001",
        title: "Elección Comisión Directiva",
        text: "Elegir nueva comisión directiva 2025",
        group: "GAB",
        mode: "public_realtime",
        createdBy: "admin",
        createdAt: now,
        votes: { yes: 0, no: 0, abs: 0 },
        votesByUser: {},
        status: "active",
        revealed: false,
        revealAt: null,
        logs: [],
        document: { body: "Texto de ejemplo de la resolución", font: "Inter, system-ui", fontSize: 14 },
      },
      {
        id: "v-002",
        title: "Aprobación Reglamento",
        text: "Aprobar nuevo reglamento interno.",
        group: "AECOS",
        mode: "secret_delayed",
        createdBy: "admin",
        createdAt: now,
        votes: { yes: 0, no: 0, abs: 0 },
        votesByUser: {},
        status: "active",
        revealed: false,
        revealAt: now + 1000 * 60 * 60, // 1 hora
        logs: [],
        document: { body: "Reglamento propuesto...", font: "Georgia, serif", fontSize: 14 },
      },
    ]
  }

  const saveVotings = (newVotings: Voting[]) => {
    setVotings(newVotings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ votings: newVotings }))
  }

  const handleLogout = () => {
    sessionStorage.clear()
    router.push("/")
  }

  const handleCreateVoting = (votingData: Partial<Voting>) => {
    const newVoting: Voting = {
      id: "v-" + Math.random().toString(36).slice(2, 9),
      title: votingData.title || "",
      text: votingData.text || "",
      group: votingData.group || "",
      mode: votingData.mode || "public_realtime",
      createdBy: currentUser,
      createdAt: Date.now(),
      votes: { yes: 0, no: 0, abs: 0 },
      votesByUser: {},
      status: "active",
      revealed: false,
      revealAt: votingData.revealAt || null,
      logs: [],
      document: { body: votingData.text || "", font: "Inter, system-ui", fontSize: 14 },
    }

    const updatedVotings = [...votings, newVoting]
    saveVotings(updatedVotings)
    setSelectedVoting(newVoting.id)
    setShowCreateModal(false)
  }

  const handleVote = (votingId: string, option: "yes" | "no" | "abs") => {
    const updatedVotings = votings.map((v) => {
      if (v.id === votingId) {
        if (v.votesByUser[currentUser]) {
          alert("Ya votaste en esta votación")
          return v
        }

        const updated = {
          ...v,
          votesByUser: { ...v.votesByUser, [currentUser]: option },
          logs: [...v.logs, { actor: currentUser, action: `Votó ${option.toUpperCase()}`, ts: Date.now() }],
        }

        // Si es votación pública, actualizar contadores inmediatamente
        if (v.mode === "public_realtime") {
          updated.votes = { ...v.votes, [option]: v.votes[option] + 1 }
          updated.revealed = true
        }

        return updated
      }
      return v
    })

    saveVotings(updatedVotings)
  }

  const handleDeleteVoting = (votingId: string) => {
    if (!userMeta?.isAdmin) return

    if (confirm("¿Eliminar votación permanentemente?")) {
      const updatedVotings = votings.filter((v) => v.id !== votingId)
      saveVotings(updatedVotings)
      if (selectedVoting === votingId) {
        setSelectedVoting(null)
      }
    }
  }

  if (!userMeta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Filtrar votaciones
  const activeVotings = votings.filter((v) => userMeta.groups.includes(v.group) && v.status !== "final")
  const finalizedVotings = votings.filter((v) => v.status === "final")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">VotingSphere — CEU</h1>
              <p className="text-sm text-gray-600">Sistema de votaciones por grupos · Acceso controlado</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {userMeta.name} ({currentUser})
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Mis grupos */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Mis grupos</h3>
              <div className="space-y-2">
                {userMeta.groups.map((group) => (
                  <div key={group} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{group}</span>
                    <Badge variant="secondary" className="text-xs">
                      Miembro
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Crear votación */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Crear votación</h3>
              <p className="text-sm text-gray-600 mb-4">
                Solo para grupos a los que perteneces. Adjunta PDF y documenta la resolución.
              </p>
              <Button onClick={() => setShowCreateModal(true)} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Nueva votación
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex">
          {/* Voting list */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Votaciones actuales */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Votaciones actuales</h2>
                  <span className="text-sm text-gray-500">
                    {activeVotings.length} para {userMeta.groups.join(", ")}
                  </span>
                </div>

                {activeVotings.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center text-gray-500">
                      No hay votaciones activas para tus grupos.
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {activeVotings.map((voting) => (
                      <VotingCard
                        key={voting.id}
                        voting={voting}
                        onSelect={setSelectedVoting}
                        onDelete={userMeta.isAdmin ? handleDeleteVoting : undefined}
                        isSelected={selectedVoting === voting.id}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Votaciones finalizadas */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Votaciones finalizadas</h2>
                  <span className="text-sm text-gray-500">{finalizedVotings.length} finalizadas</span>
                </div>

                {finalizedVotings.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center text-gray-500">
                      No hay votaciones finalizadas aún.
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {finalizedVotings.map((voting) => (
                      <VotingCard
                        key={voting.id}
                        voting={voting}
                        onSelect={setSelectedVoting}
                        isSelected={selectedVoting === voting.id}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Panel admin */}
              {userMeta.isAdmin && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Panel administrador — Todas las votaciones
                  </h2>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {votings.map((voting) => (
                          <div key={voting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{voting.title}</div>
                              <div className="text-sm text-gray-600">
                                {voting.group} · {voting.mode} · {new Date(voting.createdAt).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => setSelectedVoting(voting.id)}>
                                Abrir
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteVoting(voting.id)}>
                                X
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                        Eliminar una votación la quita permanentemente del listado (acción irreversible).
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Detail panel */}
          <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            {selectedVoting ? (
              <VotingDetail
                voting={votings.find((v) => v.id === selectedVoting)!}
                currentUser={currentUser}
                userMeta={userMeta}
                onVote={handleVote}
                onUpdate={(updatedVoting) => {
                  const updatedVotings = votings.map((v) => (v.id === updatedVoting.id ? updatedVoting : v))
                  saveVotings(updatedVotings)
                }}
              />
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <Vote className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Seleccione una votación para ver detalles y participar.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modales */}
      <CreateVotingModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateVoting}
        userGroups={userMeta.groups}
      />
    </div>
  )
}

// Componente para tarjeta de votación
function VotingCard({
  voting,
  onSelect,
  onDelete,
  isSelected,
}: {
  voting: Voting
  onSelect: (id: string) => void
  onDelete?: (id: string) => void
  isSelected: boolean
}) {
  const getStatusColor = () => {
    if (voting.status === "final") return "border-l-green-500"
    if (!voting.revealed) return "border-l-yellow-500"
    return "border-l-blue-500"
  }

  const getModeLabel = () => {
    return voting.mode === "public_realtime" ? "Normal" : "Secreto"
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${getStatusColor()} ${isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base">{voting.title}</CardTitle>
            <CardDescription className="flex items-center space-x-2 mt-1">
              <span>{voting.group}</span>
              <span>·</span>
              <span>{getModeLabel()}</span>
              {voting.revealed && <span>· revelada</span>}
            </CardDescription>
          </div>
          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(voting.id)
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <XCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{new Date(voting.createdAt).toLocaleDateString()}</span>
          <Button size="sm" onClick={() => onSelect(voting.id)}>
            Abrir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
