# Supabase 配置指南

本文档说明如何在项目中使用 Supabase 数据库。

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并注册/登录
2. 创建新项目
3. 等待项目初始化完成

## 2. 获取 API 密钥

1. 进入项目设置：Settings → API
2. 复制以下信息：
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon/public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 3. 配置环境变量

在项目根目录创建 `.env.local` 文件（如果不存在），添加以下内容：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**注意**：不要将 `.env.local` 文件提交到 Git 仓库。

## 4. 创建数据库表

1. 在 Supabase 项目中，进入 **SQL Editor**
2. 打开 `supabase/schema.sql` 文件
3. 复制整个 SQL 脚本内容
4. 在 SQL Editor 中粘贴并执行

这将创建：

- `waitlist` 表
- 必要的索引
- Row Level Security (RLS) 策略
- 自动更新时间戳的触发器

## 5. 验证配置

启动开发服务器：

```bash
npm run dev
```

访问网站并尝试提交 waitlist 表单，检查数据是否成功保存到 Supabase。

## 6. 查看数据

在 Supabase 项目中：

1. 进入 **Table Editor**
2. 选择 `waitlist` 表
3. 查看提交的数据

## 7. API 端点

### POST /api/waitlist

提交新的 waitlist 注册

**请求体：**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "ENGINEER",
  "company_size": "2 - 49"
}
```

**响应：**

```json
{
  "success": true,
  "message": "成功加入等待列表",
  "data": { ... }
}
```

### GET /api/waitlist

获取 waitlist 列表（用于管理后台）

**查询参数：**

- `limit`: 每页数量（默认：100）
- `offset`: 偏移量（默认：0）

**响应：**

```json
{
  "success": true,
  "data": [ ... ],
  "count": 100,
  "limit": 100,
  "offset": 0
}
```

## 故障排除

### 问题：环境变量未加载

- 确保 `.env.local` 文件在项目根目录
- 重启开发服务器
- 检查变量名是否正确（必须以 `NEXT_PUBLIC_` 开头）

### 问题：RLS 策略错误

- 检查 SQL 脚本是否完整执行
- 在 Supabase Dashboard 中验证 RLS 策略是否存在

### 问题：API 返回 401/403

- 检查 API 密钥是否正确
- 验证 RLS 策略是否允许匿名插入

## 安全注意事项

1. **不要**将 `.env.local` 提交到 Git
2. **不要**在前端代码中使用服务角色密钥
3. 使用 RLS 策略限制数据访问
4. 定期审查和更新 API 密钥
