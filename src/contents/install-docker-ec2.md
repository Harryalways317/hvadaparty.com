---
title: "Setting up Docker on EC2"
slug: docker-compose-ec2-setup
datetime: 2024-03-01T16:13:06.242Z
draft: false
type: post
tags:
  - docker
ogImage: ""
---


DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}

mkdir -p $DOCKER_CONFIG/cli-plugins

curl -SL https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose

chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose