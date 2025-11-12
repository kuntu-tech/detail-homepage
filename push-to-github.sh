#!/bin/bash

cd /Users/meng/Downloads/detail-homepage-mql

# 初始化 git（如果还没有）
if [ ! -d .git ]; then
    git init
fi

# 配置用户信息
git config user.name "admin"
git config user.email "admin@kuntu.tech"

# 配置远程仓库（使用 token）
git remote remove origin 2>/dev/null
git remote add origin https://github.com/kuntu-tech/detail-homepage.git

# 添加所有文件
git add -A

# 提交更改
git commit -m "feat: add waitlist functionality and update pricing section"

# 创建并切换到 mql 分支
git checkout -b mql 2>/dev/null || git checkout mql

# 推送到远程仓库
git push -u origin mql

echo "✅ 代码已成功推送到 mql 分支"

