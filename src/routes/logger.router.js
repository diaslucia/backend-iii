import { Router } from "express";

const router = Router();

router.get("/loggerTest", (req, res) => {
  req.logger.debug("Debug error message");
  req.logger.http("HTTP error message");
  req.logger.info("Info error message");
  req.logger.warning("Warning error message");
  req.logger.error("Error message");
  req.logger.fatal("Faltal error message");

  res.send("Logs generated");
});

export default router;
