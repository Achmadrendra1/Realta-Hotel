import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/auth.middleware';

//master service

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [
    //Users
  ],
  providers: [
    // Users
  ],
  // controllers: [AppController, EntitysController, BankController, PaymentGatewayController, UserAccountController, PaymentTransactionController],
  // providers: [AppService, EntitysService, BankService, PaymentGatewayService, UserAccountService, PaymentTransactionService],
})
export class GlobalModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes();
  }
}
