#!/bin/bash

set -e

cd /Users/meng/Downloads/detail-homepage-mql

echo "🔧 初始化 Git 仓库..."
if [ ! -d .git ]; then
    git init
fi

echo "🔧 配置 Git 用户信息..."
git config user.name "admin"
git config user.email "admin@kuntu.tech"

echo "🔗 配置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/kuntu-tech/detail-homepage.git

echo "📦 添加所有文件..."
git add -A

echo "💾 提交更改..."
git commit -m "feat: add waitlist functionality and update pricing section" || echo "没有更改需要提交"

echo "🌿 切换到 mql 分支..."
git checkout -b mql 2>/dev/null || git checkout mql

echo "🚀 推送到远程仓库..."
git push -u origin mql

echo "✅ 完成！代码已成功推送到 mql 分支"

