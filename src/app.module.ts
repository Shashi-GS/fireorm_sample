import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import * as Config from "./constants/Config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { GraphQLModule } from "@nestjs/graphql";
import * as path from "path";
import { ConfigModule, ConfigService } from "nestjs-config";
import { FirebaseAdminCoreModule } from "@tfarras/nestjs-firebase-admin";
import * as admin from "firebase-admin";

Config.setEnvConfig();
/* Async verification with user token */
const verify = async (idToken) => {
  if (idToken) {
    var newToken = idToken.replace("Bearer ", "");
    // var newToken = idToken
    let header = await admin
      .auth()
      .verifyIdToken(newToken)
      .then(function (decodedToken) {
        // ...
        return {
          Authorization: "Bearer " + decodedToken,
        };
      })
      .catch(function (error) {
        // Handle error
        return null;
      });
    return header;
  } else {
    throw "No Access";
  }
};

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, "config", "**", "!(*.d).{ts,js}")
    ),
    FirebaseAdminCoreModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get("firebase"),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      debug: false,
      playground: false,
      path: "/test",
      cors: true,
      context: async ({ req, res }) => {
        // headers: req.headers,
        const verified = await verify(req.headers.authorization);
        return {
          headers: verified ? verified : "",
          req,
          res,
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
