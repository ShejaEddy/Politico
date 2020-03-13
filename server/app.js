/* eslint-disable no-console */
import app from "./index";

const PORT = process.env.PORT || 4000;
app.listen(
  PORT,
  () =>
    process.env.NODE_ENV === "development" &&
    console.log(`Listening on port ${PORT}`)
);
