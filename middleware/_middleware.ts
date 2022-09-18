// pages/protected/_middleware.ts
import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import type { NextRequest } from 'next/server'
import { useRouter } from 'next/router'

const router = useRouter()

// export const middleware = withMiddlewareAuth({
//     redirectTo: '/login',
//     authGuard: {
//         isPermitted: async (user) => user.email?.endsWith('@example.com') ?? false,
//         redirectTo: '/login',
//     },
// })


export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/workout')) {
    // if (router.pathname === '/workout') {
    //     console.log(router.pathname)
        // This logic is only applied to /about
        withMiddlewareAuth({
            redirectTo: '/login',
            authGuard: {
                isPermitted: async (user) => user.email?.endsWith('@example.com') ?? false,
                redirectTo: '/login',
            },
        })

    }
}

//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     // This logic is only applied to /dashboard
//   }
// }