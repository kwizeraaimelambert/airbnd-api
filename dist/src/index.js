import "dotenv/config";
import { connectDB } from "./config/prisma.js";
import express from "express";
import usersRouter from "./routes/users.routes.js";
import listingsRouter from "./routes/listings.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";
import authRouter from "./routes/auth.routes.js";
const app = express();
app.use(express.json());
app.use("/users", usersRouter);
app.use("/listings", listingsRouter);
app.use("/bookings", bookingsRouter);
app.use("/auth", authRouter);
const PORT = process.env.PORT || 3000;
async function main() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
main();
//# sourceMappingURL=index.js.map