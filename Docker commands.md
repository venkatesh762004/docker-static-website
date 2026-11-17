# Check containers
docker ps -a

# Check images
docker images

# View container logs
docker logs static-website

# Stop container
docker stop static-website

# Start container
docker start static-website

# Remove container
docker rm -f static-website

# Remove image
docker rmi my-static-website:v1
