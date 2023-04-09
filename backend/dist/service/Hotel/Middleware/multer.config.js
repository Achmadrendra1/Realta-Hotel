"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMulter = void 0;
class ConfigMulter {
    static UploadFiles() {
        return {
            dest: './src/Service/Hotel/Uploads',
            fileFilter(req, file, callback) {
                file.filename == Date.now() + '-' + file.originalname;
                if (file.mimetype.match(/\/(jpg|png|jpeg)$/)) {
                    file.filename == Date.now() + '-' + file.originalname;
                    callback(null, true);
                }
                else {
                    return callback(new Error(` format not supported`), false);
                }
                console.log(file);
            },
            limits: { fileSize: 1 * 1024 * 1024 },
        };
    }
}
exports.ConfigMulter = ConfigMulter;
//# sourceMappingURL=multer.config.js.map