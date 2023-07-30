import { plugin } from "bun";
import { httpsPlugin } from "./src";

console.log('preloading https plugin...')
plugin(httpsPlugin())
