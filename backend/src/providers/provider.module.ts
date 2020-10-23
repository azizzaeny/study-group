import {
  Module, NestModule
} from '@nestjs/common';
import { UserModule } from 'src/providers/user/user.module';
import { AuthModule } from 'src/providers/auth/auth.module';
import { DbConnectorModule } from 'src/providers/db-connector/db-connector.module';
import { EmailModule } from 'src/providers/email/email.module';

@Module({
  imports: [UserModule, AuthModule, DbConnectorModule, EmailModule],
  exports: [UserModule, AuthModule, DbConnectorModule, EmailModule]
})
export class ProviderModule implements NestModule {
  constructor() { }
  configure() { }
}
