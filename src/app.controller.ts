import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import {
  FirebaseAdminSDK,
  FIREBASE_ADMIN_INJECT,
} from "@tfarras/nestjs-firebase-admin";
import { AuthGuard } from "@nestjs/passport";

@Controller("")
export class AppController {
  constructor(
    private readonly service: AppService,
    @Inject(FIREBASE_ADMIN_INJECT) private readonly fireSDK: FirebaseAdminSDK
  ) {}

  @Get("/")
  @UseGuards(AuthGuard("firebase"))
  health() {
    return { data: "ok" };
  }
}
