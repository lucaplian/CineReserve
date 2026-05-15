#!/bin/bash

set -e

TOKEN=$(docker swarm join-token -q worker)
MANAGER_IP=$(docker info -f '{{.Swarm.NodeAddr}}')

echo "Manager: $MANAGER_IP"

for i in 1 2 3; do
  NAME="worker-$i"

  echo "Starting $NAME..."

  docker run -d \
    --privileged \
    --name $NAME \
    docker:dind

  sleep 5

  echo "Joining Swarm..."
  docker exec $NAME docker swarm join --token $TOKEN $MANAGER_IP:2377

done

echo "Done. Now run: docker node ls"