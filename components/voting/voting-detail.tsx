"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Minus, Eye, Plus } from "lucide-react"

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

interface VotingDetailProps {
  voting: Voting
  currentUser: string
  userMeta: UserMeta
  onVote: (votingId: string, option: "yes" | "no" | "abs") => void
  onUpdate: (voting: Voting) => void
}

export function VotingDetail({ voting, currentUser, userMeta, onVote, onUpdate }: VotingDetailProps) {
  const [showAdminPreview, setShowAdminPreview] = useState(false)

  const hasVoted = !!voting.votesByUser[currentUser]
  const canVote = userMeta.groups.includes(voting.group) && voting.status !== "final"
  const canShow = voting.revealed

  // Calcular estadísticas
  const groupMemberCount = (group: string) => {
    // Simulación - en producción vendría de la base de datos
    const groupSizes: Record<string, number> = {
      GAB: 15,
      AECOS: 12,
      AEITU: 18,
      AEETU: 14,
    }
    return groupSizes[group] || 10
  }

  const voters = Object.keys(voting.votesByUser).length
  const registered = groupMemberCount(voting.group)
  const absent = Math.max(0, registered - voters)

  const handleVote = (option: "yes" | "no" | "abs") => {
    if (!canVote || hasVoted) return
    onVote(voting.id, option)
  }

  const handleManualVote = (option: "yes" | "no" | "abs") => {
    if (!userMeta.isAdmin) return

    const updated = {
      ...voting,
      manualAdds: {
        ...voting.manualAdds,
        [option]: (voting.manualAdds?.[option] || 0) + 1,
      },
      logs: [...voting.logs, { actor: currentUser, action: `Admin +1 ${option.toUpperCase()}`, ts: Date.now() }],
    }

    if (voting.revealed) {
      updated.votes = {
        ...voting.votes,
        [option]: voting.votes[option] + 1,
      }
    }

    onUpdate(updated)
  }

  const handleReveal = () => {
    if (!userMeta.isAdmin) return

    // Calcular totales
    const tallies = { yes: 0, no: 0, abs: 0 }

    // Votos de usuarios
    Object.values(voting.votesByUser).forEach((vote) => {
      tallies[vote]++
    })

    // Votos manuales del admin
    if (voting.manualAdds) {
      tallies.yes += voting.manualAdds.yes || 0
      tallies.no += voting.manualAdds.no || 0
      tallies.abs += voting.manualAdds.abs || 0
    }

    const updated = {
      ...voting,
      votes: tallies,
      revealed: true,
      status: "final" as const,
      logs: [...voting.logs, { actor: currentUser, action: "Reveló y finalizó votación", ts: Date.now() }],
    }

    onUpdate(updated)
  }

  const getFinalResult = () => {
    if (!canShow) return null

    const { yes, no } = voting.votes
    if (yes > no) return { text: "APROBADO", className: "text-green-600" }
    if (no > yes) return { text: "RECHAZADO", className: "text-red-600" }
    return { text: "EMPATE", className: "text-yellow-600" }
  }

  const result = getFinalResult()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{voting.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Grupo: {voting.group} · Modo: {voting.mode === "public_realtime" ? "Normal" : "Secreto"} · Creada por:{" "}
          {voting.createdBy}
        </p>
        <p className="text-gray-700">{voting.text}</p>
      </div>

      {/* Documento */}
      {voting.document && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              style={{
                fontFamily: voting.document.font,
                fontSize: `${voting.document.fontSize}px`,
              }}
              className="whitespace-pre-wrap"
            >
              {voting.document.body}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botones de votación */}
      {canVote && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Tu voto</h4>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => handleVote("yes")}
              disabled={hasVoted}
              variant={hasVoted && voting.votesByUser[currentUser] === "yes" ? "default" : "outline"}
              className="flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>SÍ</span>
            </Button>
            <Button
              onClick={() => handleVote("no")}
              disabled={hasVoted}
              variant={hasVoted && voting.votesByUser[currentUser] === "no" ? "default" : "outline"}
              className="flex items-center justify-center space-x-2"
            >
              <XCircle className="w-4 h-4" />
              <span>NO</span>
            </Button>
            <Button
              onClick={() => handleVote("abs")}
              disabled={hasVoted}
              variant={hasVoted && voting.votesByUser[currentUser] === "abs" ? "default" : "outline"}
              className="flex items-center justify-center space-x-2"
            >
              <Minus className="w-4 h-4" />
              <span>ABST.</span>
            </Button>
          </div>

          <p className="text-sm text-gray-600">
            {hasVoted
              ? voting.revealed
                ? `Has votado: ${voting.votesByUser[currentUser].toUpperCase()}`
                : "Has votado (tu elección se mostrará tras la revelación)"
              : "No has votado aún. 1 voto por persona."}
          </p>
        </div>
      )}

      {/* Resultados */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Resultados</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-600">SÍ</div>
            <div className="text-xl font-bold">{canShow ? voting.votes.yes : "—"}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-600">NO</div>
            <div className="text-xl font-bold">{canShow ? voting.votes.no : "—"}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-600">ABST.</div>
            <div className="text-xl font-bold">{canShow ? voting.votes.abs : "—"}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-600">AUSENTES</div>
            <div className="text-xl font-bold">{canShow ? absent : "—"}</div>
          </div>
        </div>

        {result && <div className={`text-center font-bold text-lg ${result.className}`}>{result.text}</div>}

        {!canShow && (
          <p className="text-sm text-gray-600 text-center">
            {voting.mode === "secret_delayed"
              ? "Resultado oculto hasta revelación automática"
              : "Resultado oculto hasta que admin revele"}
          </p>
        )}
      </div>

      {/* Controles de administrador */}
      {userMeta.isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Controles de administrador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <Button size="sm" variant="outline" onClick={() => handleManualVote("yes")}>
                <Plus className="w-3 h-3 mr-1" />
                +1 SÍ
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleManualVote("no")}>
                <Plus className="w-3 h-3 mr-1" />
                +1 NO
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleManualVote("abs")}>
                <Plus className="w-3 h-3 mr-1" />
                +1 ABST
              </Button>
              <Button size="sm" onClick={handleReveal}>
                {voting.revealed ? "Finalizar" : "Revelar"}
              </Button>
            </div>

            <Button size="sm" variant="ghost" onClick={() => setShowAdminPreview(!showAdminPreview)} className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              {showAdminPreview ? "Ocultar vista" : "Vista admin"}
            </Button>

            {/* Vista previa de votos (solo admin) */}
            {showAdminPreview && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="font-medium text-sm mb-2">Vista previa de votos (solo admin)</h5>
                {Object.keys(voting.votesByUser).length > 0 ? (
                  <div className="space-y-1">
                    {Object.entries(voting.votesByUser).map(([user, vote]) => (
                      <div key={user} className="text-sm">
                        <strong>{user}</strong> — {vote.toUpperCase()}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Aún no hay votos registrados.</p>
                )}

                {voting.manualAdds && (voting.manualAdds.yes || voting.manualAdds.no || voting.manualAdds.abs) && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h6 className="font-medium text-sm mb-1">Votos agregados por admin:</h6>
                    {voting.manualAdds.yes > 0 && <div className="text-sm">+{voting.manualAdds.yes} SÍ</div>}
                    {voting.manualAdds.no > 0 && <div className="text-sm">+{voting.manualAdds.no} NO</div>}
                    {voting.manualAdds.abs > 0 && <div className="text-sm">+{voting.manualAdds.abs} ABST.</div>}
                  </div>
                )}
              </div>
            )}

            {/* Log de acciones */}
            <div>
              <h5 className="font-medium text-sm mb-2">Registro de acciones</h5>
              <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                {voting.logs.length > 0 ? (
                  <div className="space-y-1">
                    {voting.logs
                      .slice()
                      .reverse()
                      .map((log, index) => (
                        <div key={index} className="text-xs">
                          <strong>{log.actor}</strong> — {log.action}
                          <span className="text-gray-500 ml-2">({new Date(log.ts).toLocaleString()})</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No hay acciones registradas.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
