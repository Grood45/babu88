# Fix "Failed to Fetch" Error

The error happens because:
1.  **CORS**: The backend didn't know about `11crickex.live`. (I fixed this in the code).
2.  **Wrong Variable Name**: The frontend needs `VITE_BASE_API_URL`, but we set `VITE_API_URL`.

## Step 1: Push the Code Fix
I have updated the code to allow your domain on the backend.

## Step 2: Update Server Configuration

Run these commands on your **AWS Server**:

1.  **Open the client environment file**:
    ```bash
    nano /var/www/babu88/client/.env
    ```

2.  **Change the content to**:
    ```env
    VITE_BASE_API_URL=http://11crickex.live:5001
    ```
    (Make sure to use your exact domain and port 5001).
    *Check: Ensure Port 5001 is OPEN in your AWS Security Group (Inbound Rules).*

3.  **Redeploy**:
    ```bash
    cd /var/www/babu88
    ./deploy.sh
    ```

After this, the "Failed to fetch" error should be gone.
