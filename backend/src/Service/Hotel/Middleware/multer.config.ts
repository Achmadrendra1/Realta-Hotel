import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export class ConfigMulter {
  static UploadFiles(): MulterOptions {
    return {
      dest: './src/Service/Hotel/Uploads',
      fileFilter(req, file, callback) {
        file.filename == Date.now() + '-' + file.originalname;
        if (file.mimetype.match(/\/(jpg|png|jpeg)$/)) {
          file.filename == Date.now() + '-' + file.originalname;
          callback(null, true);
        } else {
          return callback(new Error(` format not supported`), false);
        }
        console.log(file);
      },
      limits: { fileSize: 1 * 1024 * 1024 },
    };
  }
}
