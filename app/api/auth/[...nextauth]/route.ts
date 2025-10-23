import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from '@/lib/auth-service';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone_number: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.phone_number || !credentials?.password) {
          console.log('认证失败: 手机号码或密码为空');
          return null;
        }

        try {
          const result = await AuthService.validateUser(
            credentials.phone_number,
            credentials.password
          );

          console.log("result", result)

          if (!result.success || !result.user) {
            console.log('认证失败:', result.error);
            return null;
          }

          const user = result.user;
          
          // 从数据库获取的权限信息中提取权限代码
          const permissions = user.permissions?.map(p => p.element_key) || [];
          console.log('从数据库获取的权限:', permissions);

          console.log('user', user);

          return {
            id: user.user_id.toString(),
            name: user.user_name,
            email: `${user.phone_number}@example.com`,
            phone_number: user.phone_number,
            employee_id: user.employee_id,
            roles: user.roles,
            permissions: permissions // 使用从数据库获取的权限代码数组
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
    signOut: "/login", // 明确指定登出页面
  },
  
  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.roles?.[0]?.role_name || 'unknown';
        token.userId = user.id;
        token.phone_number = user.phone_number;
        token.employee_id = user.employee_id;
        token.roles = user.roles;
        token.permissions = user.permissions; // 保存从数据库获取的权限数组
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.userId;
        session.user.phone_number = token.phone_number;
        session.user.employee_id = token.employee_id;
        session.user.roles = token.roles;
        session.user.permissions = token.permissions; // 从token获取权限数组并添加到session
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      
      // 如果是相对路径，直接返回，浏览器会自动使用当前域名
      if (url.startsWith('/')) {
        return url;
      }
      
      // 如果是完整URL，检查是否与baseUrl同源
      if (url === baseUrl || url.startsWith(baseUrl)) {
        return url;
      }
      
      // 其他情况，返回baseUrl
      return baseUrl;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET || "secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };