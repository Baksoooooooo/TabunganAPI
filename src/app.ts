import express from "express";
import userRouter from "@routes/userRouter";
import tabunganRouter from "@routes/tabunganRouter";
import NotFound from "@middlewares/NotFound";
import ErrorHandler from "@middlewares/ErrorHandler";

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/tabungan", tabunganRouter);

app.use(NotFound);
app.use(ErrorHandler);

app.listen(3000, () => {
  console.log("Server Running");
});
