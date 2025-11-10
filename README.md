# Pokemon App 🎮

A full-stack Pokemon application with user authentication, allowing users to browse Pokemons using the PokeAPI.


## Note 📝
**If you would like to see the Task project built using AI prompting see: [TaskManagement.md](TaskManagement.md)**

## 📋 Features

- **User Authentication**: Secure JWT-based authentication with HTTP-only cookies
- **Pokemon Browser**: Browse Pokemon with detailed information from PokeAPI
- **Responsive Design**: Mobile-first approach using Material-UI
- **Type Safety**: Full TypeScript implementation on both frontend and backend

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **React Router v7** - Client-side routing with lazy loading
- **Material-UI (MUI)** - UI component library
- **Axios** - HTTP client

### Backend
- **Node.js** with Express
- **TypeScript** - Type-safe server code
- **MongoDB** with Mongoose - Database and ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cookie-Parser** - Cookie handling

## 📁 Project Structure
```
pokemon-crud/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/        # Images
│   │   ├── components/    # Reusable components
│   │   ├── constants/     # Reusable constants
│   │   ├── context/       # React context (Auth)
│   │   ├── hooks/         # Reusable hooks
│   │   ├── pages/         # Page components
│   │   ├── providers/     # React providers
│   │   ├── routing/       # Page routes
│   │   ├── queries/       # Api queries
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript interfaces
│   │   └── util/          # Helper functions
│   ├── package.json
│   └── vite.config.ts
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── constants/     # Reusable constants
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Auth middlewares
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── types/         # TypeScript interfaces
│   │   ├── utils/         # Helper utilities
│   │   └── server.ts      # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── package.json           # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/pokemon-app.git
   cd pokemon-app
```

2. **Install all dependencies**
```bash
   npm run install:all
```

3. **Configure environment variables**

   ***Disclaimer: The env file is being uploaded for the code presentation only***

   Create `server/.env`:
```env
   MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/pokemon_app_db?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   JWT_EXPIRE=7d
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   PORT=5000
```

4. **Run the application**
```bash
   npm run dev
```

The app will start on:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📝 Available Scripts

### Root Directory
```bash
# Install dependencies for all projects
npm run install:all

# Run both client and server concurrently
npm run dev

# Build both projects for production
npm run build

# Run production server
npm start

# Clean all node_modules
npm run clean
```

### Client Only
```bash
  cd client

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Server Only
```bash
  cd server

# Start development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production server
npm start
```

## 🔑 API Endpoints

### Authentication
```
POST   /auth/register  - Register new user
POST   /auth/login     - Login user
POST   /auth/logout    - Logout user
GET    /auth/me        - Get current user (protected)
```

### Pokemon (Protected Routes)
```
GET    /pokemon/:id    - Get single pokemon
POST   /pokemon        - Get pokemon(s) using collection filters
```

## 🧪 Testing the API

You can test the API using curl or Postman:
```bash
# Register a new user
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"ash","email":"ash@pokemon.com","password":"pikachu123"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ash@pokemon.com","password":"pikachu123"}' \
  -c cookies.txt

# Get current user (protected)
curl -X GET http://localhost:5000/auth/me \
  -b cookies.txt
```

## 🎨 Features Breakdown

### Authentication System
- Secure password hashing with bcrypt
- JWT tokens stored in HTTP-only cookies
- Protected routes with authentication middleware
- Automatic token verification

### Pokemon Integration
- Fetches data from [PokeAPI](https://pokeapi.co/)
- Loading skeleton indicators
- Caching and optimization

### Responsive Design
- Mobile-first approach
- Material-UI breakpoints (xs, sm, md, lg, xl)
- Smooth animations and transitions
- Pokemon type color coding

### Dependencies issues
```bash
   # Clean install
   npm run clean
   npm run install:all
```

### CORS issues
Make sure `CLIENT_URL` in server `.env` matches your frontend URL

## 📦 Production Deployment

### Build for production
```bash
  npm run build
```

## 📄 License

This project is licensed under the MIT License.

## 👏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) - The RESTful Pokemon API
- [Material-UI](https://mui.com/) - React UI framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database

## 📧 Contact

Alvaro Linarez - [@alvlinarez](https://x.com/alvlinarez) - alvlinarez@gmail.com

Project Link: [https://github.com/alvlinarez/pokemon-app](https://github.com/alvlinarez/pokemon-app)

---

Made with ❤️ and ⚡ by Alvaro Linarez