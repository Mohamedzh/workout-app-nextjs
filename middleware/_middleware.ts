// pages/protected/_middleware.ts
import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import type { NextRequest } from 'next/server'

export const middleware = withMiddlewareAuth({
    redirectTo: '/login',
    authGuard: {
        isPermitted: async (user) => user.email?.endsWith('@example.com') ?? false,
        redirectTo: '/login',
    },
})


// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith('/about')) {
//     // This logic is only applied to /about
//   }

//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     // This logic is only applied to /dashboard
//   }
// }