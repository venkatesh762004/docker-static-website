# Static Website Deployment using Docker

## Technologies
- Docker
- Nginx
- HTML
- CSS
- AWS EC2

## Project Description
Deployed a static website using Docker
and Nginx on an AWS EC2 instance.

## Docker Commands

Build:
docker build -t my-static-website:v1 .

Run:
docker run -d -p 8080:80 --name static-website:v1

Access:
http://localhost:8080
