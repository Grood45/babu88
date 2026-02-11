#!/bin/bash

# Deployment Script for Babu88 Project
# Run this script on your AWS server to update and deploy the project.

echo "🚀 Starting Deployment..."

# 1. Pull latest changes
echo "📥 Pulling latest code from git..."
git pull

# 2. Backend Setup
echo "🛠️  Setting up Backend..."
cd server
npm install
echo "🔄 Restarting Backend Server..."
pm2 restart babu88-server

# 3. Frontend Setup
echo "🛠️  Setting up Frontend..."
cd ../client
echo "📦 Installing Frontend Dependencies (Legacy Peer Deps)..."
npm install --legacy-peer-deps
echo "🏗️  Building Frontend..."
npm run build

echo "✅ Deployment Complete! Your changes are now live."
