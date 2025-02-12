// frontend/mini-contact-app-front/app/api/auth/[...nextauth]/route.ts

export const runtime = 'edge'; // Specify that this is an edge function

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
