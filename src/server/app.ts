import chalk from "chalk";
import express from "express";

export const app = express();
app.disable("x-powered-by");

export const startServer = (port: number) => {
  app.listen(port, () => {
    chalk.green(`¡Oh yeah! Serve listening in port http://localhost:${port}`);
  });
};
