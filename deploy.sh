#!/usr/bin/env bash


rsync -av -e ssh --exclude="node_modules" --exclude=".git" --exclude=".idea" --exclude=".DS_Store" ./ root@95.216.223.67:/root/nechat_bot
ssh root@95.216.223.67 "docker container rm nechat-bot --force && docker build -t nechat-bot /root/nechat_bot && docker run --restart on-failure -d --name nechat-bot nechat-bot && docker image prune -f"
