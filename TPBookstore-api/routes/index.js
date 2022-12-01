import userRouter from "./userRoutes.js";

const routes = (app) => {
  app.use("/api/v1/user", userRouter);
};
export default routes;
