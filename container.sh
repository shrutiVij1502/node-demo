docker stop shrutiimage
docker rm `docker ps -aq`
docker run -p 49180:3000 --name shrutiimage -d shrutivij02/nodejs:latest
