import "dotenv/config";
import { connectDB } from "./config/prisma.js";
import express from "express";
import usersRouter from "./routes/users.routes.js";
import listingsRouter from "./routes/listings.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";
import authRouter from "./routes/auth.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import reviewsRouter from "./routes/reviews.routes.js";
import { setupSwagger } from "./config/swagger.js";
const app = express()
setupSwagger(app);
app.use(express.json());
app.use("/users", usersRouter);
app.use("/listings", listingsRouter);
app.use("/bookings", bookingsRouter);
app.use("/auth", authRouter);
app.use("/users", uploadRouter);
app.use("/reviews", reviewsRouter);
const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main();
