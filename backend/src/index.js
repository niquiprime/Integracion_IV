const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const app = express();

require("./DB/db");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});

// Capturar body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Documentation
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "StockMovil API",
      version: "0.1.0",
      description: "Esta es una API de productos",
    },
  },
  apis: ["./src/Routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Routes: quiero agregar /api/products y /api/users
const productsRouter = require("./Routes/products");
const usersRouter = require("./Routes/users");
const loginRegisterRouter = require("./Routes/login-register");
const validateJWT = require("./Routes/validate-Jwt");

//app.use('/api/producto',validateJWT, productsRouter);
app.use("/api", loginRegisterRouter);
app.use("/api/producto", validateJWT, productsRouter);
app.use("/api/usuario", validateJWT, usersRouter);

// CORS
app.use(cors());
