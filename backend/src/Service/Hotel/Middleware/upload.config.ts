export class UploadConfig {
  static customFileName(req, file, callback) {
    let customName = file.originalname.split('.')[0];
    customName =
      customName + Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = '.jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = '.png';
    } else if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = '.jpeg';
    }
    customName = customName + fileExtension;
    callback(null, customName);
  }
  static storage(req, file, callback) {
    callback(null, './src/Service/Hotel/Uploads');
  }
}
