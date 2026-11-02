/** Endereço da API Django. Em produção/Docker, defina DJANGO_API_URL. */
export const DJANGO_API_URL = process.env.DJANGO_API_URL ?? "http://127.0.0.1:8000/api";
