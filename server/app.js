import app from "./index";
import logger from "./helpers/logger";

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  () =>
    process.env.NODE_ENV === "development" &&
    logger.info(`Listening on port ${PORT}`)
);
