#! /bin/bash

docker build \
    --platform=linux/amd64 \
    -t mateuszkrolik/my-places-social-media:latest .

# docker run \
#     --platform=linux/amd64 \
#     -d \
#     -p 3000:3000 \
#     --env-file .env \
#     mateuszkrolik/my-places-social-media:latest