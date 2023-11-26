import chalk from "chalk";

const port = process.env.PORT ?? 1914;

if (!process.env.MONGODB_URL) {
  chalk.red("Missing MongoDBconnection");
  process.exit();
}
