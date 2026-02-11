# Nginx Setup Guide

Follow these steps to configure your server with the new Nginx file.

## Step 1: Pull the Config File
On your server:
```bash
cd /var/www/babu88
git pull
```

## Step 2: Install the Config

1.  **Copy the file**:
    ```bash
    sudo cp nginx_babu88.conf /etc/nginx/sites-available/babu88
    ```

2.  **Enable it**:
    ```bash
    sudo ln -s /etc/nginx/sites-available/babu88 /etc/nginx/sites-enabled/
    ```

3.  **Remove Default Config (Important)**:
    ```bash
    sudo rm /etc/nginx/sites-enabled/default
    ```

4.  **Test Configuration**:
    ```bash
    sudo nginx -t
    ```
    (If it says "syntax is ok", proceed. If error, check the file).

5.  **Restart Nginx**:
    ```bash
    sudo systemctl restart nginx
    ```

## Step 3: Verification
Now your site should work on `http://11crickex.live` (Port 80) without needing Port 8000 open to the public.

**Note on SSL (HTTPS):**
If you want HTTPS (Green Lock), run:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d 11crickex.live -d www.11crickex.live
```
Follow the instructions, and it will automatically update this Nginx file for SSL.
