const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const inventoryRoutes = require('./routes/inventory-routes');
const jwtAuthenticationMiddleware = require('./routes/middlewares/jwt-auth-middleware');

app.use(express.json());
app.use(express.urlencoded());

// All APIs under /auth is not secured.
app.use('/auth', authRoutes);

// All APIs under /api is secured jwt authentication
const masterRoute = express();
masterRoute.use('/inventories', inventoryRoutes);

app.use('/api', jwtAuthenticationMiddleware, masterRoute);

app.listen(7800, () => {
    console.log("Server is running");
});