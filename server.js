const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");

const userRoutes = require("./routes/route");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send({ status: "API running!" }));

app.use("/api", userRoutes);

app.listen(port, () => console.log(`Server started on PORT ${port}`));
