#!/bin/bash

echo "🔍 Checking Server Status..."

# 1. Check if Node is running
echo "-----------------------------------"
echo "1. PM2 Application Status:"
pm2 list

# 2. Check Port 8000
echo "-----------------------------------"
echo "2. Check what is running on Port 8000:"
sudo netstat -tulnp | grep 8000

# 3. Check UFW (Firewall)
echo "-----------------------------------"
echo "3. Firewall Status (UFW):"
sudo ufw status verbose

# 4. Check .env content
echo "-----------------------------------"
echo "4. Environment File Content:"
cat /var/www/babu88/server/.env

echo "-----------------------------------"
echo "Done."
