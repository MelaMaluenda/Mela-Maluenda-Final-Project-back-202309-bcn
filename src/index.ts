import "dotenv/config";
import debugCreator from "debug";

const debug = debugCreator("photos: main");

const port = process.env.PORT ?? 1914;
