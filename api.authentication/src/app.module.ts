import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ModulesModule } from '@modules/modules.module';
import { APP_INTERCEPTOR } from '@constants/index';
import { ErrorInterceptor } from '@interceptors/error.interceptor';

const interceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ErrorInterceptor,
};

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ModulesModule],
  controllers: [],
  providers: [interceptorProvider],
})
export class AppModule {}
