import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "./auth-service";

// 角色默认路由映射
const DEFAULT_ROUTE_FOR_ROLE: Record<string, string> = {
  'admin': '/',
  'pe': '/pe',
  'checker': '/',
  'expert': '/expert',
  '商务': '/',
  '提示词工程师': '/pe',
  '审核员': '/',
  '授权员': '/expert',
};

// 页面权限映射 - 定义每个页面需要哪些权限
const PAGE_PERMISSION_MAP = {
  '/': ['ELE_APP_CHECKER', 'ELE_APP_EXPERT'], // 首页需要任意应用权限
  '/login': [], // 登录页面不需要权限
  '/logout': [], // 退出页面不需要权限
  '/pe': ['ELE_APP_PE'], // PE页面需要PE应用权限
  '/pe-optimizer': ['ELE_APP_PE'], // PE优化页面需要PE应用权限
  '/checker': ['ELE_APP_CHECKER'], // 检查员页面需要检查员应用权限
  '/checker/review-recheck': ['ELE_APP_CHECKER'], // 复审页面需要检查员应用权限
  '/external-document': ['ELE_APP_CHECKER'], // 外部文档页面需要检查员应用权限
  '/expert': ['ELE_APP_EXPERT'], // 专家页面需要专家应用权限
  '/expert/review': ['ELE_APP_EXPERT'], // 专家审核页面需要专家应用权限
  '/blank-page': ['ELE_SYSTEM_A'], // 空白页面需要系统权限A
  '/test': ['ELE_SYSTEM_B'], // 测试页面需要系统权限B
};

// 检查用户是否有页面访问权限 - 基于权限列表
export function hasPagePermission(userPermissions: string[], pathname: string): boolean {
  console.log('=== 权限检查函数 ===');
  console.log('用户权限:', userPermissions);
  console.log('请求路径:', pathname);
  
  // 参数验证
  if (!userPermissions || userPermissions.length === 0) {
    console.log('❌ 用户权限列表为空');
    return false;
  }
  
  // 处理动态路由匹配
  let matchedPath = pathname;
  
  // 检查是否是动态路由，如果是则匹配基础路径
  if (pathname.startsWith('/checker/review-recheck/')) {
    matchedPath = '/checker/review-recheck';
  } else if (pathname.startsWith('/expert/review/')) {
    matchedPath = '/expert/review';
  } else if (pathname.startsWith('/pe-optimizer/')) {
    matchedPath = '/pe-optimizer';
  }
  
  console.log('匹配的路径:', matchedPath);
  
  // 获取页面需要的权限
  const requiredPermissions = PAGE_PERMISSION_MAP[matchedPath as keyof typeof PAGE_PERMISSION_MAP];
  console.log('页面需要权限:', requiredPermissions);
  
  // 如果没有配置权限要求，默认允许访问
  if (!requiredPermissions || requiredPermissions.length === 0) {
    console.log('✅ 页面无权限要求，默认允许访问');
    return true;
  }
  
  // 检查用户是否拥有页面所需的任意一个权限
  const hasPermission = requiredPermissions.some(requiredPermission => 
    userPermissions.includes(requiredPermission)
  );
  
  console.log('权限检查结果:', {
    userPermissions,
    requiredPermissions,
    hasPermission
  });
  
  return hasPermission;
}

// 获取角色显示名称 - 从用户角色信息中获取
export function getRoleDisplayName(userRoles: any[]): string {
  if (!userRoles || userRoles.length === 0) {
    return '未知角色';
  }
  
  // 返回第一个角色的员工姓名作为显示名称
  const firstRole = userRoles[0];
  return firstRole.role_name || '未知角色';
}

// 获取角色显示名称 - 兼容旧版本（基于角色名称）
export function getRoleDisplayNameByRole(role: string): string {
  const roleDisplayNames: Record<string, string> = {
    'admin': '管理员',
    'pe': 'PE工程师',
    'checker': '检查员',
    'expert': '专家',
    '商务': '商务',
    '提示词工程师': 'PE工程师',
    '审核员': '审核员',
    '授权员': '授权员',
  };
  
  return roleDisplayNames[role] || role;
}

// 获取角色权限列表 - 基于角色名称（用于显示）
export function getRolePermissions(role: string): string[] {
  const rolePermissions: Record<string, string[]> = {
    'admin': ['所有权限'],
    'pe': ['PE应用访问', 'PE报告管理', 'PE优化功能'],
    'checker': ['检查员应用访问', '审核功能', '文档管理'],
    'expert': ['专家应用访问', '专家审核', '专家验证'],
    '商务': ['商务功能'],
    '提示词工程师': ['PE应用访问', 'PE报告管理', 'PE优化功能'],
    '审核员': ['检查员应用访问', '审核功能', '文档管理'],
    '授权员': ['专家应用访问', '专家审核', '专家验证', '系统管理'],
  };
  
  return rolePermissions[role] || [];
}

// 获取角色默认跳转路由
export function getDefaultRouteForRole(role: string): string {
  return DEFAULT_ROUTE_FOR_ROLE[role] ?? '/';
}

// NextAuth v4 配置
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone_number: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.phone_number || !credentials?.password) {
          return null;
        }

        try {
          const result = await AuthService.validateUser(
            credentials.phone_number,
            credentials.password
          );

          if (!result.success || !result.user) {
            return null;
          }

          const user = result.user;

          return {
            id: user.user_id.toString(),
            name: user.user_name,
            email: `${user.phone_number}@example.com`,
            role: user.roles?.[0]?.role_name || 'unknown',
            permissions: user.permissions?.map(p => p.element_key) || [],
            roles: user.roles || [],  
            employee_id: user.employee_id,
          };
        } catch (error) {
          console.error('认证失败:', error);
          return null;
        }
      }
    })
  ],
  
  pages: {
    signIn: "/login",
  },
  
  session: {
    strategy: "jwt" as const,
  },
  
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
        token.userId = user.id;
        token.permissions = user.permissions;
        token.roles = user.roles;
        token.employee_id = user.employee_id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.userId;
        session.user.permissions = token.permissions;
        session.user.roles = token.roles;
        session.user.employee_id = token.employee_id;
      }
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET || "secret",
  
  // 添加这些配置来避免 OpenID Connect 相关的问题
  debug: false,
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === "production"
      }
    }
  }
};

// 创建 NextAuth 实例
const handler = NextAuth(authOptions);

// 导出用于 API 路由的处理器
export { handler as GET, handler as POST }; 