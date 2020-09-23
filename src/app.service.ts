import { Injectable, OnModuleInit } from "@nestjs/common";
import * as Config from "./constants/Config";

const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

@Injectable()
export class AppService implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    console.log(`The module has been initialized.`);
  }

  async notify(data: string) {
    return { data: "ok" };
  }

  async cacheData(data: string) {
    let result: any = cache.get(data);
    return { data: result ? result : null };
  }
}
