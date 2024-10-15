import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CustomJwtPayload } from "@/models/jwt.model";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isProtected = pathname.startsWith('/management');
    const isProfileNavigation = pathname.startsWith('/management/profile');
    const token = req.cookies.get('token')?.value;

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/content', req.url));
    }

    let decoded: any;
    try {
        decoded = jwtDecode<CustomJwtPayload>(token as string)
    } catch (error) {
        return NextResponse.redirect(new URL('/content', req.url));
    }
    
    // skip module checking for profile navigation but requires checking for token
    if (isProfileNavigation) {
        return NextResponse.next();
    }

    const userModules = decoded?.modules || [];
    const moduleFromPath = pathname.split('/')[2].replace(/-/g, '_');;
    const hasAccess = userModules.some((module: string | string[]) => module.includes(moduleFromPath));

    if (!hasAccess) {
        return NextResponse.redirect(new URL('/content', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/management/:path*'],
};
