import { userRouter } from "./routes/user.route.js";
import { gameRouter } from "./routes/game.route.js";
import connDB from "./db/conn.js";
import app from "./app.js"
connDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while conecting", err);
  });
export {userRouter,gameRouter}