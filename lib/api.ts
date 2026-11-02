import axios from "axios";

/**
 * Cliente usado pelos componentes do front-end.
 * Ele chama as rotas /api do próprio Next.js (app/api/tasks),
 * que repassam as requisições para a API Django.
 */
const api = axios.create({
  baseURL: "/api",
});

export default api;
