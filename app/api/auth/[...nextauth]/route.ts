import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
export const runtime = 'nodejs';
/* export const runtime = 'edge'; */