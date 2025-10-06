// credentials.js - Solo para desarrollo local. Contiene usuarios de prueba y contraseñas en texto plano.
// En producción debes usar un backend seguro y no exponer contraseñas en cliente.
export const CREDENTIALS = {
  users: {
    admin: { password: "admin123", name: "Administrador", groups: ["GAB", "AECOS", "COMITE"], role: "admin" },
    user1: { password: "user1pass", name: "Usuario 1", groups: ["GAB"], role: "user" },
    user2: { password: "user2pass", name: "Usuario 2", groups: ["AECOS"], role: "user" },
    user3: { password: "user3pass", name: "Usuario 3", groups: ["COMITE"], role: "user" },
    user4: { password: "user4pass", name: "Usuario 4", groups: ["GAB", "AECOS"], role: "user" },
  },
}
