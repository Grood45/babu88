# Step-by-Step Deployment Guide (Simplified)

Follow these exact steps to deploy your website easily.

## Step 1: Push Your Code (Do this NOW on your computer)

I have already created a command for you to push your code. Please approve the `git push` command in the chat.

This sends your `deploy.sh` script to GitHub.

## Step 2: Login to AWS Server

Open your terminal and connect to your AWS server:

```bash
ssh -i /path/to/your-key.pem ubuntu@your-server-ip
cd /var/www/babu88
```

## Step 3: Deployment (Just Run This!)

Once you are inside `/var/www/babu88`, run these two commands:

1.  **Give Permission** (Only need to do this once):
    ```bash
    chmod +x deploy.sh
    ```

2.  **Start Deployment**:
    ```bash
    ./deploy.sh
    ```

**That's it!** The script will:
*   Download your new code.
*   Update the backend.
*   Update the frontend.
*   Restart everything automatically.

Whenever you want to update your site, just repeat **Step 1** (Push) and **Step 3** (Run `./deploy.sh`).
