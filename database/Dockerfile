# Use the official MongoDB image from the Docker Hub
FROM mongo:latest

RUN apt-get update && \
    apt-get install -y mongodb-clients


# Expose the MongoDB port
EXPOSE 27017

# Optionally, you can set environment variables for MongoDB (e.g., password)
# ENV MONGO_INITDB_ROOT_USERNAME=root
# ENV MONGO_INITDB_ROOT_PASSWORD=rootpassword

# Optionally, copy custom initialization scripts into the container (e.g., for creating databases or users)
# COPY init-db.js /docker-entrypoint-initdb.d/

# The MongoDB image runs its own entrypoint, so no need to specify one here
CMD ["mongod"]