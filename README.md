# Full Stack Project Setup & Deployment Guide

This guide covers how to set up the project locally, configure environment variables, deploy to AWS, and set up Nginx as a reverse proxy.

## 📁 Project Structure

- **client/**: React frontend (Vite)
- **server/**: Node.js/Express backend

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas URL)
- Git

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 3. Backend Setup (Server)
Navigate to the server directory, install dependencies, and set up the environment.

```bash
cd server
npm install
```

**Create `.env` file in `server/` directory:**
Copy `.env.example` to `.env` or create new:
```env
PORT=5001
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
SITE_NAME=YourSiteName
SITE_LOGO=url_to_logo
AGENT_LOGIN_LINK=agent_login_url
CLIENT_URL=http://localhost:5173
```

**Run Server:**
```bash
npm run dev
# Server will start on http://localhost:5001
```

### 4. Frontend Setup (Client)
Open a new terminal, navigate to client directory.

```bash
cd client
npm install
```

**Create `.env` file in `client/` directory:**
```env
VITE_BASE_API_URL=http://localhost:5001
```

**Run Client:**
```bash
npm run dev
# Client will start on http://localhost:5173
```

---

## ☁️ AWS Deployment Guide (EC2)

### 1. Launch EC2 Instance
- Launch an Ubuntu 20.04/22.04 instance.
- Allow ports **80 (HTTP)**, **443 (HTTPS)**, and **22 (SSH)** in Security Group.

### 2. Connect to Instance
```bash
ssh -i key.pem ubuntu@your-ec2-ip
```

### 3. Install Dependencies
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### 4. Clone and Setup Project on Server
```bash
git clone <your-repo-url>
cd <project-folder>
```

**Backend Setup:**
```bash
cd server
npm install
# Create .env file with nano .env and paste your production variables
# Make sure CLIENT_URL matches your domain
```

**Frontend Setup (Build):**
```bash
cd ../client
npm install
# Create .env file with nano .env
# Set VITE_BASE_API_URL to your domain/api or IP/api if using path routing, or the full backend URL
npm run build
# This creates a 'dist' folder
```

### 5. Start Backend with PM2
```bash
cd ../server
pm2 start index.js --name "backend"
pm2 save
pm2 startup
```

---

## 🌐 Nginx Configuration

We will serve the frontend static files and proxy API requests to the backend.

### 1. Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/myapp
```

### 2. Paste Configuration
Replace `your_domain_or_ip` with your actual Domain or Public IP.

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    # Serve Frontend (React Build)
    location / {
        root /home/ubuntu/<project-folder>/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API Requests to Backend
    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Enable Config and Restart Nginx
```bash
# Link the config
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# Remove default config
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

Now your app should be live on your IP/Domain!

---

## 🔒 SSL Setup (Optional but Recommended)
For HTTPS, use Certbot.

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```
