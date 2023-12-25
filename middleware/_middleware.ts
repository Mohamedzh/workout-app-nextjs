import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/workout')) {
        withMiddlewareAuth({
            redirectTo: '/login',
            authGuard: {
                isPermitted: async (user) => user.email?.endsWith('@example.com') ?? false,
                redirectTo: '/login',
            },
        })
    }
}