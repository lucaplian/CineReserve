# 1. Extragem automat token-ul și IP-ul managerului
TOKEN=$(docker swarm join-token -q worker)
MANAGER_IP=$(docker info -f '{{.Swarm.NodeAddr}}')

# 2. Creăm și conectăm cei 3 workeri într-o buclă rapidă
for i in 1 2 3; do
  echo "Pornim worker-$i..."
  docker run -d --privileged --name worker-$i docker:dind
  
  echo "Așteptăm 3 secunde să pornească Docker în interior..."
  sleep 3
  
  echo "Conectăm worker-$i la cluster..."
  docker exec worker-$i docker swarm join --token $TOKEN $MANAGER_IP:2377
done

echo "Gata! Verifică nodurile cu: docker node ls"