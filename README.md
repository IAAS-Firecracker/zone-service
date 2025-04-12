# ZONE-SERVICE

# Application NodeJS

## Description
Service node.js et express.js pour la gestion des zones. Elle utilise **Postgresql** comme sgbd, **sequelize** comme ORM, **RabbitMQ** comme serveur de messagerie, et peut se connecter au serveur **eureka**;


## 📋 Prérequis

- Node.js (version 22.12.0+)
- npm (version 10.9.0)

## 🛠️ Installation

### Clonage du Projet

```bash
git clone https://github.com/IAAS-Firecracker/zone-service.git
cd zone-service
```

### Installation des Dépendances

```bash
npm install
```

## 🔧 Configuration

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez les variables d'environnement suivantes :

```
JWT_SECRET=jwt_secret

# Configuration de la base de données
DB_HOST=db_host
DB_USER=db_user
DB_NAME=db_name
DB_PASSWORD=db_password
DB_PORT=5432

DEFAULT_DB_NAME=postgres

NODE_ENV=development

CONFIG_SERVER_URL=http://localhost:8080
SERVICE_NAME=user-service

RABBITMQ_URL=amqp://localhost
ZONE_EXCHANGE=ZoneExchange
ZONE_NOTIFICATION_EXCHANGE=ZONE_NOTIFICATION_EXCHANGE
ZONE_SERVER_EXCHANGE=ZONE_SERVER_EXCHANGE
```

## 🚦 Démarrage de l'Application

```bash
npm start
```

## 📡 Points de Terminaison API

### Zones

- `GET /api/zones` - Récupérer toutes les zones
- `GET /api/zones/:id` - Récupérer une zone
- `POST /api/zones` - Creer de nouvelles zones
- `PATCH /api/zones/:id` - Modifier une zone
- `DELETE /api/zones/:id` - Supprimer une zone

### Serveurs

- `GET /api/servers` - Récupérer tous les serveurs
- `GET /api/zone-servers` - Récupérer tous les serveurs dans une zone spécifique
- `GET /api/servers/:id` - Récupérer un serveur spécifique
- `POST /api/servers` - Creer de nouveaux serveurs
- `PATCH /api/servers/:id` - Modifier un serveur spécifique
- `DELETE /api/servers/:id` - Supprimer un serveur spécifique

## 🧪 Tests

```bash
npm test
```

## 📦 Dépendances Principales

- Express.js
- bcrypt
- jsonwebtoken
- dotenv
- cors
- sequelize
- amqplib
- eureka-js-client

## 📝 Structure du Projet

```
app/
│
├── controllers/
├── middleware/
├── models/ 
├── routes/
│
├── .env
├── .gitignore
├── db.js
├── Dockerfile
├── package.json
├── rabbit-config.js
├── rabbit-ops.js
├── sequelize.js
└── README.md
```

## 🤝 Contribution

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📜 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

## 📞 Contact

Mac Dallas - [roylexstephane@gmail.com]

Lien du Projet: [https://github.com/IAAS-Firecracker/zone-service.git](https://github.com/IAAS-Firecracker/zone-service)