// src/lib/edenClient.ts
import { treaty } from '@elysiajs/eden'
import type { App } from '@ffffff-board/server'   // <-- path to the server file

// `treaty` creates a *typed* client from the App type
export const api = treaty<App>(import.meta.env.VITE_BACKEND_URL)
api['hello:id'].get(
    {
        query: {
            id: 23
        }
    }
)