# Projet Fullstack React + GoFiber

## 📦 Installation rapide

```bash
# Cloner le projet
git clone https://github.com/ton-utilisateur/ton-projet.git
cd ton-projet
```

### Backend (GoFiber)

```bash
cd backend
go mod tidy             # Installation des dépendances Go
air                     # Démarrage avec hot reload (Air)
```

> Assurez-vous que `air` est installé :  
> `go install github.com/cosmtrek/air@latest`

### Frontend (React)

```bash
cd frontend
npm install             # ou yarn install
npm run dev             # ou yarn dev
```

---

## 🗄️ Migration de la base de données (MySQL)

```bash
# Connexion à la base de données et import
mysql -u root -p -h localhost -D nom_de_la_base < data/chaussures.sql
```


---

## 🔗 Accès

- Frontend : http://localhost:3000
- Backend : http://localhost:8000 (par défaut)

---

## ✅ Prérequis

- Go ≥ 1.18
- Node.js ≥ 18.x
- `air` pour le backend (`go install github.com/cosmtrek/air@latest`)
- Serveur MySQL (local ou distant)

