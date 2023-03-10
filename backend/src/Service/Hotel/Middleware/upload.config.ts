import { extname } from 'path';

export class UploadConfig {
  static PhotoFilename(req, file, callback) {
    let customName = file.originalname.split('.')[0];
    customName += '-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${customName}${ext}`;
    callback(null, filename);
  }
}
