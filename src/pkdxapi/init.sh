#!/bin/bash

# Exécuter mvn clean install
echo "Building Maven project..."
mvn install

# Construire l'image Docker
echo "Building Docker image..."
docker build -t pkdxapi .

# Revenir à la racine du projet
cd ./src/main/resources

# Démarrer les conteneurs Docker en arrière-plan
echo "Starting Docker containers..."
docker compose up -d

echo "Deployment completed successfully!"

docker compose down

docker compose up -d

echo "Launching completed successfully!"