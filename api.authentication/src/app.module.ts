import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { APP_INTERCEPTOR } from '@shared/constants/index';
import { ModulesModule } from '@modules/modules.module';

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
