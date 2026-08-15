# UrbanGarden

**UrbanGarden is a digital marketplace for nurseries, plant lovers, and urban gardening products.**

It connects local nursery owners with customers who want plants, seeds, pots, soil, pebbles, bulbs, and gardening accessories without visiting multiple stores. Customers can explore products by category, view nursery profiles, add items to cart, and place orders. Nursery owners can register their nursery and manage products from the platform.

## What Makes UrbanGarden Different

UrbanGarden is not just a product catalog. It is designed around two users:

- **Customers** who want a simple way to discover and buy gardening products.
- **Nursery owners** who want an online presence for their local business.

The application combines e-commerce features with nursery-specific workflows such as setting up a nursery profile, linking products to nurseries, filtering by city, and managing plant-related categories.

## Core Modules

### Customer Experience

- Browse plants, seeds, pots, soil, gardening tools, pebbles, bulbs, and accessories.
- View trending and category-based products.
- Open detailed product pages.
- Explore individual nursery pages.
- Add products to cart.
- Manage cart items.
- Place and view orders.
- Access protected profile pages after login.

### Nursery Owner Experience

- Register and log in as a user.
- Set up a nursery profile.
- Add product details for the nursery.
- Update nursery and product information.
- Manage products connected to a nursery account.

### Backend System

- JWT-based authentication.
- Role-based protected routes.
- MongoDB models for users, nurseries, products, carts, and orders.
- Express route groups for each major feature.
- Centralized API error handling.
- CORS and cookie-based request support.

## Tech Overview

| Layer | Technologies |
| --- | --- |
| Frontend | React, React Router, Redux Toolkit, Redux Persist, Axios |
| UI | CSS, Material UI, Framer Motion, Swiper |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs, cookies |
| Tooling | npm, nodemon, react-scripts |

## Repository Map

```text
UrbanGarden/
|-- client/                 React frontend
|   |-- public/
|   `-- src/
|       |-- assets/          Images and static frontend assets
|       |-- Components/      Reusable UI components
|       |-- hooks/           Custom React hooks
|       |-- lib/             API base configuration
|       |-- Pages/           Main route pages
|       |-- redux/           Redux store, slices, and API calls
|       |-- App.js           Frontend route definitions
|       `-- index.js         React entry point
|
|-- server/                 Express backend
|   |-- controllers/         Request logic
|   |-- models/              Mongoose schemas
|   |-- routes/              API route definitions
|   |-- utils/               Auth, validation, and error helpers
|   `-- index.js             Server entry point
|
`-- README.md
```

## Application Routes

The frontend includes routes for:

- `/` - landing page
- `/Login` - user login
- `/Register` - user registration
- `/Home` - main shopping page
- `/UserProfile/:username` - protected user profile
- `/SetupNursery` - protected nursery setup page
- `/AddProductControl` - product creation flow
- `/category/:categ` - category page
- `/nursery/:nurseryId` - nursery profile page
- `/Products/:productId` - product detail page
- `/Cart` - protected cart page

## API Endpoints

Default API base URL:

```text
http://localhost:8800/api
```

| Feature | Endpoint Group |
| --- | --- |
| Authentication | `/auth` |
| Users | `/users` |
| Nurseries | `/nurseries` |
| Products | `/products` |
| Cart | `/cart` |
| Orders | `/orders` |

Common endpoints include:

- `POST /auth/register`
- `POST /auth/login`
- `GET /nurseries`
- `GET /nurseries/:id`
- `GET /nurseries/:id/products`
- `POST /nurseries/:ownerId`
- `GET /products`
- `GET /products/trending`
- `GET /products/categories`
- `GET /products/city/:city`
- `POST /products/:nurseryId`
- `GET /cart/find/:userId`
- `GET /orders/find/:userId`

Some routes require a logged-in user or admin/nursery-owner permissions.

## Local Setup

### 1. Clone the project

```bash
git clone <repository-url>
cd UrbanGarden
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGO_URL=your_mongodb_connection_string
JWT=your_jwt_secret
PORT=8800
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

Start the backend:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

### 3. Configure the frontend

Open another terminal:

```bash
cd client
npm install
```

Optional `client/.env`:

```env
REACT_APP_API_URL=http://localhost:8800/api
```

Start the React app:

```bash
npm start
```

The app will open at:

```text
http://localhost:3000
```

## Environment Variables

| Variable | Required | Used In | Purpose |
| --- | --- | --- | --- |
| `MONGO_URL` | Yes | Server | MongoDB connection string |
| `JWT` | Yes | Server | Secret for signing JWT tokens |
| `PORT` | No | Server | Backend port, defaults to `8800` |
| `CLIENT_URL` | No | Server | Allowed frontend origin for CORS |
| `NODE_ENV` | No | Server | Controls error stack visibility |
| `REACT_APP_API_URL` | No | Client | Overrides frontend API base URL |

## Scripts

### Frontend

```bash
npm start       # run development server
npm run build   # create production build
npm test        # run React test runner
```

### Backend

```bash
npm start       # run Express server
npm run dev     # run Express server with nodemon
```

## Data Models

UrbanGarden stores the main application data in MongoDB using Mongoose models:

- `User` - account, authentication, and role information.
- `Nursery` - nursery profile and owner-linked details.
- `Product` - product information connected to nurseries.
- `Cart` - user cart items.
- `Order` - placed order records.

## Project Status

UrbanGarden is a working MERN project with customer shopping flows, nursery setup, product browsing, cart support, authentication, and backend APIs. It can be extended with payment integration, image uploads, admin dashboards, inventory tracking, and deployment configuration.

## Authors

- Hamza Sayyed
- Om Shete - [LinkedIn](https://www.linkedin.com/in/om-shete-25748522a/)
- Mohib Abbas Sayed - [LinkedIn](https://www.linkedin.com/in/mohib-abbas-sayed-83837422a/)

## License

This project is licensed under the GNU GPL v3 License.
