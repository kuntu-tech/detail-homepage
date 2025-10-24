import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

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

export interface AuthResult {
  success: boolean
  user?: UserInfo
  error?: string
  errorCode?: string
}

export class AuthService {
  /**
   * 验证用户登录
   * @param phoneNumber 手机号码（登录账号）
   * @param password 密码
   * @returns 验证结果
   */
  static async validateUser(phoneNumber: string, password: string): Promise<AuthResult> {
    try {
      // 参数验证
      if (!phoneNumber || !password) {
        return {
          success: false,
          error: '手机号码和密码不能为空',
          errorCode: 'INVALID_PARAMS'
        }
      }

      console.log(`开始验证用户: ${phoneNumber}`);

      // 检查Prisma连接
      if (!prisma) {
        return {
          success: false,
          error: '数据库连接异常',
          errorCode: 'DB_CONNECTION_ERROR'
        }
      }

      // 首先尝试从旧表查询用户
      let user = await prisma.user.findFirst({
        where: {
          phone_number: phoneNumber,
          data_status: "1" // 只查询有效用户
        }
      })

      if (user) {
        console.log(`在旧表中找到用户: ${user.user_name}`);
      }

      // 如果旧表没有找到，尝试从新表查询
      if (!user) {
        try {
          console.log('在旧表中未找到用户，尝试查询新表...');
          // 使用原始SQL查询新表
          const result = await prisma.$queryRaw`
            SELECT 
              user_id,
              user_name,
              password,
              role,
              data_status
            FROM hamu_system_user_base_info 
            WHERE user_name = ${phoneNumber} 
            AND data_status = '1'
          `;
          
          if (Array.isArray(result) && result.length > 0) {
            const newUser = result[0] as any;
            console.log(`在新表中找到用户: ${newUser.user_name}, 角色: ${newUser.role}`);
            user = {
              id: newUser.user_id,
              user_name: newUser.user_name,
              password: newUser.password,
              role: newUser.role,
              phone_number: newUser.user_name, // 新表用user_name作为手机号
              employee_id: newUser.user_id.toString(),
              data_status: newUser.data_status,
              staff_id: null,
              department: null,
              position: null,
              email: null,
              created_time: new Date(),
              updated_time: new Date()
            };
          } else {
            console.log('新表中也未找到用户');
          }
        } catch (newTableError) {
          console.warn('查询新用户表失败:', newTableError);
        }
      }

      if (!user) {
        console.log(`用户不存在: ${phoneNumber}`);
        return {
          success: false,
          error: '用户不存在或已被禁用',
          errorCode: 'USER_NOT_FOUND'
        }
      }

      // 验证密码
      let isPasswordValid = false;
      
      console.log(`开始验证密码，密码长度: ${user.password?.length || 0}`);
      
      // 如果是新表的用户，密码可能是明文
      if (user.password && user.password.length < 50) {
        // 明文密码直接比较
        isPasswordValid = password === user.password;
        console.log('使用明文密码比较');
      } else {
        // 加密密码使用bcrypt比较
        isPasswordValid = await bcrypt.compare(password, user.password || '');
        console.log('使用bcrypt密码比较');
      }
      
      console.log(`密码验证结果: ${isPasswordValid ? '成功' : '失败'}`);
      
      if (!isPasswordValid) {
        return {
          success: false,
          error: '密码错误',
          errorCode: 'INVALID_PASSWORD'
        }
      }
      
      console.log('密码验证成功，获取用户完整信息...');
      
      // 获取用户完整信息（包括角色和权限）
      const userWithRolesAndPermissions = await this.getUserWithRolesAndPermissions(user.id)

      console.log("用户完整信息:", userWithRolesAndPermissions)
      return {
        success: true,
        user: userWithRolesAndPermissions
      }
    } catch (error) {
      console.error('用户验证失败:', error)
      
      // 根据错误类型返回具体的错误信息
      if (error instanceof Error) {
        if (error.message.includes('connect')) {
          return {
            success: false,
            error: '数据库连接失败，请稍后重试',
            errorCode: 'DB_CONNECTION_ERROR'
          }
        } else if (error.message.includes('timeout')) {
          return {
            success: false,
            error: '请求超时，请稍后重试',
            errorCode: 'TIMEOUT_ERROR'
          }
        }
      }
      
      return {
        success: false,
        error: '系统异常，请稍后重试',
        errorCode: 'SYSTEM_ERROR'
      }
    }
  }

  /**
   * 根据手机号码获取用户信息
   * @param phoneNumber 手机号码
   * @returns 用户信息或 null
   */
  static async getUserByPhoneNumber(phoneNumber: string): Promise<UserInfo | null> {
    try {
      if (!phoneNumber) {
        console.warn('getUserByPhoneNumber: 手机号码为空')
        return null
      }

      const user = await prisma.user.findFirst({
        where: {
          phone_number: phoneNumber,
          data_status: "1"
        }
      })

      if (!user) {
        console.warn(`getUserByPhoneNumber: 未找到手机号码为 ${phoneNumber} 的用户`)
        return null
      }

      // 获取用户完整信息（包括角色和权限）
      return await this.getUserWithRolesAndPermissions(user.id)
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }

  /**
   * 根据用户ID获取用户信息
   * @param userId 用户ID
   * @returns 用户信息或 null
   */
  static async getUserById(userId: number): Promise<UserInfo | null> {
    try {
      if (!userId || userId <= 0) {
        console.warn('getUserById: 无效的用户ID')
        return null
      }

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
          data_status: "1"
        }
      })

      if (!user) {
        console.warn(`getUserById: 未找到ID为 ${userId} 的用户`)
        return null
      }

      // 获取用户完整信息（包括角色和权限）
      return await this.getUserWithRolesAndPermissions(user.id)
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }

  /**
   * 获取用户完整信息（包括角色和权限）
   * @param userId 用户ID
   * @returns 用户完整信息
   */
  static async getUserWithRolesAndPermissions(userId: number): Promise<UserInfo> {
    try {
      if (!userId || userId <= 0) {
        throw new Error('无效的用户ID')
      }

      // 先查询用户基本信息
      let user = await prisma.user.findUnique({
        where: { id: userId }
      })

      // 如果旧表没有找到，尝试从新表查询
      if (!user) {
        try {
          const result = await prisma.$queryRaw`
            SELECT 
              user_id,
              user_name,
              role,
              data_status
            FROM hamu_system_user_base_info 
            WHERE user_id = ${userId}
          `;
          
          if (Array.isArray(result) && result.length > 0) {
            const newUser = result[0] as any;
            user = {
              id: Number(newUser.user_id),
              user_name: newUser.user_name,
              password: '',
              role: newUser.role,
              phone_number: newUser.user_name,
              employee_id: newUser.user_id.toString(),
              data_status: newUser.data_status,
              staff_id: null,
              department: null,
              position: null,
              email: null,
              created_time: new Date(),
              updated_time: new Date()
            };
          }
        } catch (newTableError) {
          console.warn('查询新用户表失败:', newTableError);
        }
      }

      if (!user) {
        throw new Error('用户不存在')
      }

      // 分步查询用户角色和权限信息，避免嵌套查询的约束问题
      let roles: RoleInfo[] = []
      let permissions: PermissionInfo[] = []

      try {
        // 查询用户角色映射
        const userRoleMappings = await prisma.mapping_user_role.findMany({
          where: { user_id: userId }
        })
        
        if (userRoleMappings.length > 0) {
          // 获取有效的角色ID列表
          const roleIds = userRoleMappings
            .map(mapping => Number(mapping.role_id))
            .filter(roleId => roleId !== null && !isNaN(roleId))

          if (roleIds.length > 0) {
            // 查询角色信息
            const roleInfos = await prisma.role_base_info.findMany({
              where: { id: { in: roleIds } }
            })

            // 构建角色信息
            roles = roleInfos.map(role => ({
              role_id: role.id,
              employee_name: role.employee_name,
              role_name: role.role_name || '未知角色',
              department: role.department || '未知部门',
              position: role.position || '未知职位',
              position_status: role.position_status || '1'
            }))

            // 查询角色权限映射
            const roleElementMappings = await prisma.mapping_role_element.findMany({
              where: { role_id: { in: roleIds } }
            })

            if (roleElementMappings.length > 0) {
              // 获取权限ID列表
              const elementIds = roleElementMappings
                .map(mapping => Number(mapping.element_id))
                .filter(elementId => elementId !== null && !isNaN(elementId))

              if (elementIds.length > 0) {
                // 查询权限信息
                const elements = await prisma.element.findMany({
                  where: { id: { in: elementIds } }
                })

                // 构建权限信息（去重）
                const permissionMap = new Map<number, PermissionInfo>()
                elements.forEach(element => {
                  if (!permissionMap.has(Number(element.id))) {
                    permissionMap.set(Number(element.id), {
                      element_id: Number(element.id),
                      element_name: element.element_name || '未知权限',
                      element_key: element.element_key || 'UNKNOWN'
                    })
                  }
                })
                permissions = Array.from(permissionMap.values())
              }
            }
          }
        }
      } catch (roleError) {
        console.warn('查询用户角色权限时出现问题，使用默认值:', roleError)
        // 如果角色权限查询失败，使用空数组作为默认值
        roles = []
        permissions = []
      }

      // 如果是新表用户且没有角色信息，根据role字段创建默认角色
      if (roles.length === 0 && user.role) {
        roles = [{
          role_id: userId,
          employee_name: user.user_name,
          role_name: user.role,
          department: '默认部门',
          position: '默认职位',
          position_status: '1'
        }];

        // 根据角色分配默认权限
        if (user.role === 'checker') {
          permissions = [{
            element_id: 4,
            element_name: 'B系统_CHECKER',
            element_key: 'ELE_APP_CHECKER'
          }];
        } else if (user.role === 'pe') {
          permissions = [{
            element_id: 3,
            element_name: 'B系统_PE',
            element_key: 'ELE_APP_PE'
          }];
        } else if (user.role === '商务') {
          permissions = [{
            element_id: 2,
            element_name: 'B系统',
            element_key: 'ELE_SYSTEM_B'
          }];
        }
      }

      return {
        user_id: user.id,
        user_name: user.user_name,
        phone_number: user.phone_number || user.user_name,
        employee_id: user.employee_id || user.id.toString(),
        data_status: user.data_status || '1',
        roles,
        permissions
      }
    } catch (error) {
      console.error('获取用户角色和权限失败:', error)
      throw error
    }
  }

  /**
   * 检查用户是否有指定权限
   * @param userId 用户ID
   * @param permissionKey 权限键
   * @returns 是否有权限
   */
  static async hasPermission(userId: number, permissionKey: string): Promise<boolean> {
    try {
      if (!userId || !permissionKey) {
        console.warn('hasPermission: 参数无效')
        return false
      }

      const userInfo = await this.getUserWithRolesAndPermissions(userId)
      return userInfo.permissions?.some(permission => permission.element_key === permissionKey) || false
    } catch (error) {
      console.error('检查用户权限失败:', error)
      return false
    }
  }

  /**
   * 检查用户是否有指定角色
   * @param userId 用户ID
   * @param roleName 角色名称
   * @returns 是否有角色
   */
  static async hasRole(userId: number, roleName: string): Promise<boolean> {
    try {
      if (!userId || !roleName) {
        console.warn('hasRole: 参数无效')
        return false
      }

      const userInfo = await this.getUserWithRolesAndPermissions(userId)
      return userInfo.roles?.some(role => role.role_name === roleName) || false
    } catch (error) {
      console.error('检查用户角色失败:', error)
      return false
    }
  }

  /**
   * 创建新用户
   * @param userData 用户数据
   * @returns 创建结果
   */
  static async createUser(userData: {
    user_name: string
    password: string
    phone_number: string
    employee_id: string
  }) {
    try {
      // 参数验证
      if (!userData.phone_number || !userData.password || !userData.user_name) {
        throw new Error('用户信息不完整')
      }

      // 检查手机号码是否已存在
      const existingUser = await prisma.user.findFirst({
        where: {
          phone_number: userData.phone_number,
          data_status: "1"
        }
      })

      if (existingUser) {
        throw new Error('手机号码已存在')
      }

      // 加密密码
      const hashedPassword = await bcrypt.hash(userData.password, 12)

      // 创建用户
      const newUser = await prisma.user.create({
        data: {
          user_name: userData.user_name,
          password: hashedPassword,
          phone_number: userData.phone_number,
          employee_id: userData.employee_id
        }
      })

      return {
        user_id: newUser.id,
        user_name: newUser.user_name,
        phone_number: newUser.phone_number,
        data_status: newUser.data_status
      }
    } catch (error) {
      console.error('创建用户失败:', error)
      throw error
    }
  }

  /**
   * 为用户分配角色
   * @param userId 用户ID
   * @param roleId 角色ID
   * @returns 分配结果
   */
  static async assignRoleToUser(userId: number, roleId: number) {
    try {
      if (!userId || !roleId) {
        throw new Error('用户ID和角色ID不能为空')
      }

      // 检查是否已经分配过该角色
      const existingMapping = await prisma.mapping_user_role.findFirst({
        where: {
          user_id: userId,
          role_id: roleId
        }
      })

      if (existingMapping) {
        throw new Error('用户已拥有该角色')
      }

      // 创建用户角色映射
      const mapping = await prisma.mapping_user_role.create({
        data: {
          user_id: userId,
          role_id: roleId
        }
      })

      return mapping
    } catch (error) {
      console.error('分配角色失败:', error)
      throw error
    }
  }

  /**
   * 为角色分配权限
   * @param roleId 角色ID
   * @param elementId 权限ID
   * @returns 分配结果
   */
  static async assignPermissionToRole(roleId: number, elementId: number) {
    try {
      if (!roleId || !elementId) {
        throw new Error('角色ID和权限ID不能为空')
      }

      // 检查是否已经分配过该权限
      const existingMapping = await prisma.mapping_role_element.findFirst({
        where: {
          role_id: roleId,
          element_id: elementId
        }
      })

      if (existingMapping) {
        throw new Error('角色已拥有该权限')
      }

      // 创建角色权限映射
      const mapping = await prisma.mapping_role_element.create({
        data: {
          role_id: roleId,
          element_id: elementId
        }
      })

      return mapping
    } catch (error) {
      console.error('分配权限失败:', error)
      throw error
    }
  }
}
