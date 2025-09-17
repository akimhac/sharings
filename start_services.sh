#!/bin/bash
# Script pour démarrer les services Sharings

echo "🚀 Démarrage des services Sharings..."

# Fonction pour tuer les processus existants
cleanup() {
    echo "🧹 Nettoyage des processus existants..."
    pkill -f "node.*server.js" || true
    pkill -f "vite" || true
    sleep 2
}

# Fonction pour démarrer le backend
start_backend() {
    echo "📡 Démarrage du backend..."
    cd /workspaces/sharings/server
    npm run dev &
    BACKEND_PID=$!
    echo "Backend PID: $BACKEND_PID"
    cd ..
}

# Fonction pour démarrer le frontend
start_frontend() {
    echo "🎨 Démarrage du frontend..."
    npm run dev &
    FRONTEND_PID=$!
    echo "Frontend PID: $FRONTEND_PID"
}

# Gestion des signaux d'arrêt
trap cleanup EXIT

# Nettoyage initial
cleanup

# Démarrage des services
start_backend
sleep 3
start_frontend

echo "✅ Services démarrés !"
echo "🔗 Frontend: http://localhost:5173"
echo "🔗 Backend: http://localhost:3001/api/health"

# Attendre les processus
wait
