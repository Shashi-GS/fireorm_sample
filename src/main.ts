import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as bodyParser from "body-parser";
import * as Config from "./constants/Config";
import * as admin from "firebase-admin";
const serviceAccount = require("../serviceAccountKey.json");
import * as fireorm from "fireorm";

async function bootstrap() {
  //initialize admin SDK using serciceAcountKey
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FB_REALTIME_DB_URL,
  });
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "100mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  await app.listen(Config.PORT, Config.HOST);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((e) => {
  console.error(`❌  Error starting server, ${e}`, "", "Bootstrap", false);
  throw e;
});
const db = admin.firestore();
fireorm.initialize(db);
