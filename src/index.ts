import "dotenv/config";
import debugCreator from "debug";
import chalk from "chalk";
import { connectToDatabase } from "./database/index.js";
import { startServer } from "./server/app.js";

const debug = debugCreator("streetphotography: main");

const port = process.env.PORT ?? 1914;

if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing MongoDB connection"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);
startServer(+port);
