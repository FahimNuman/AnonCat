import express from "express";
import dotenv from "dotenv";

// Routes import
import usersRoute from "./src/app/modules/user/user.route.js";
import adminUsersRoute from "./src/app/modules/adminUser/adminUser.route.js";
import projectTitleRoute from "./src/app/modules/projectTitle/projectTitle.route.js";
import routes from "./src/app/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { healthRoutes } from "./src/app/modules/health/health.route.js";

const app = express();

app.use("/public/uploads", express.static("public/uploads"));
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use("/api/v1/admin-users", adminUsersRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/health", healthRoutes);

app.use("/api/v1/project-title", projectTitleRoute);
// app.use("/api/v1/company", companyRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong !";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

export default app;
