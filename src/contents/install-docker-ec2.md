title: "Docker Compose Installation on EC2"
slug: docker-ec2
datetime: 2023-07-13T16:13:06.242Z
draft: true
tags:
- advice
- entry-level
- learning
  ogImage: ""
---
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
