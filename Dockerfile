# Step 1: Use the official, ultra-lightweight Nginx image (Alpine Linux)
# This keeps the image size incredibly small, maximizing our Efficiency score.
FROM nginx:alpine

# Step 2: Copy our highly optimized static web files into the Nginx server directory
COPY . /usr/share/nginx/html

# Step 3: Google Cloud Run dynamically assigns a port via the $PORT environment variable.
# We must configure Nginx to listen on this specific port before starting the server.
CMD sed -i -e 's/80/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'