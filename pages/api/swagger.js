// pages/api/swagger.js
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import express from "express";

const router = express.Router();

// Load your Swagger definition file
const swaggerDocument = YAML.load(path.resolve(process.cwd(), "swagger.yaml"));

// Serve Swagger UI
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

export default router;
