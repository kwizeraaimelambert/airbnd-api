import express from "express";
import usersRouter from "./routes/users.routes.js";
import listingsRouter from "./routes/listings.routes.js";
const app = express()
app.use(express.json());
app.use("/users", usersRouter);
app.use("/listings", listingsRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

