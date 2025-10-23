// 用户信息相关类型定义
export interface UserInfo {
  user_id: number
  user_name: string
  phone_number: string
  employee_id: string
  data_status: string
  roles?: RoleInfo[]
  permissions?: PermissionInfo[]
}

export interface RoleInfo {
  role_id: number
  employee_name: string
  role_name: string
  department: string
  position: string
  position_status: string
}

export interface PermissionInfo {
  element_id: number
  element_name: string
  element_key: string
}

// NextAuth Session 扩展类型
export interface ExtendedSession {
  user: {
    id: string
    name: string
    email: string
    phone_number: string
    employee_id: string
    role: string
    roles: RoleInfo[]
    permissions: string[]
  }
  expires: string
}

// 用户信息获取状态
export interface UserInfoState {
  user: UserInfo | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

// 用户信息获取Hook返回值
export interface UseUserInfoReturn extends UserInfoState {
  refreshUserInfo: () => Promise<void>
  hasPermission: (permissionKey: string) => boolean
  hasRole: (roleName: string) => boolean
  hasAnyPermission: (permissionKeys: string[]) => boolean
  hasAnyRole: (roleNames: string[]) => boolean
  logout: () => Promise<void>
}

// API响应类型
export interface UserInfoApiResponse {
  success: boolean
  data?: UserInfo
  error?: string
  errorCode?: string
}
