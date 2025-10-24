import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // 添加调试日志
  console.log('=== 中间件权限检查 ===');
  console.log('请求路径:', pathname);
  
  // 登录页面特殊处理 - 直接允许访问
  if (pathname.startsWith('/login')) {
    console.log('访问登录页面，允许通过');
    return NextResponse.next();
  }
  
  // 检查是否有 NextAuth 会话 cookie
  const sessionToken = req.cookies.get('next-auth.session-token') || 
                      req.cookies.get('__Secure-next-auth.session-token');
  
  console.log('会话状态:', sessionToken ? '已登录' : '未登录');
  
  // 如果用户未登录，重定向到登录页面
  if (!sessionToken) {
    console.log('用户未登录，重定向到登录页面');
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // 如果用户已登录，允许访问
  console.log('✅ 用户已登录，允许访问');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 