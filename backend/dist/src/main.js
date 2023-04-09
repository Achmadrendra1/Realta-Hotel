"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const main_module_1 = require("./main.module");
const express = require("express");
const path = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(main_module_1.MainModule);
    app.enableCors();
    app.use('/restomenuphotos', express.static(path.join(__dirname, '../restomenuphotos')));
    const port = 3600;
    await app.listen(port, () => {
        console.log(`server anda berjalan pada port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map