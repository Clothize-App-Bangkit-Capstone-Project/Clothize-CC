import { app } from "./application/app.js";
import { logger } from "./application/logging.js";

app.listen(3000, () => {
    logger.info("Application are running on port 3000")
})