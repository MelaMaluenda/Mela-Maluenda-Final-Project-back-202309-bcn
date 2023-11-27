import "dotenv/config";
import debugCreator from "debug";
import chalk from "chalk";
import express from "express";

const debug = debugCreator("streetphotography: server: app");

export const app = express();
app.disable("x-powered-by");

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(
      chalk.green(`¡Oh yeah! Serve listening in port http://localhost:${port}`),
    );
  });
};
