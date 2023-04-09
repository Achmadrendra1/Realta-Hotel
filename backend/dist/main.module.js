"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./service/app.service");
const typeorm_1 = require("@nestjs/typeorm");
const global_module_1 = require("./Module/global.module");
const app_controller_1 = require("./Controller/app.controller");
const platform_express_1 = require("@nestjs/platform-express");
let MainModule = class MainModule {
};
MainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
                entities: ['dist/entities/*{.ts,.js}'],
                synchronize: false,
                autoLoadEntities: true,
            }),
            global_module_1.GlobalModule,
            platform_express_1.MulterModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map