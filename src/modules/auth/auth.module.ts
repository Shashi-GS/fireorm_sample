import { Module, HttpModule } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { FirebaseStrategy } from "src/middle-wares/firebase.stratergy";

@Module({
  imports: [HttpModule, PassportModule],
  providers: [AuthResolver, AuthService, FirebaseStrategy],
  exports: [FirebaseStrategy],
})
export class AuthModule {}
