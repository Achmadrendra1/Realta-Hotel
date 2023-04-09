"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadConfig = void 0;
const path_1 = require("path");
class UploadConfig {
    static PhotoFilename(req, file, callback) {
        let customName = file.originalname.split('.')[0];
        customName += '-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = (0, path_1.extname)(file.originalname);
        const filename = `${customName}${ext}`;
        callback(null, filename);
    }
}
exports.UploadConfig = UploadConfig;
//# sourceMappingURL=upload.config.js.map