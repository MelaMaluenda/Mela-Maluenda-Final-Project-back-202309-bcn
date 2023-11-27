import chalk from "chalk";
import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("streetphotography: database: main");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", false);
    debug(chalk.blue("Connected to database"));
  } catch {
    debug(chalk.red("Not connected to database"));
  }
};
