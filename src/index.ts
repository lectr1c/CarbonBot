import { Config } from "./interfaces/Config";
import * as File from "../resources/configs/config.json";
import { Bot } from "./client/Client";

console.log(File.token);
new Bot().start(File as Config);
