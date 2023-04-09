import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
export declare class GlobalModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
