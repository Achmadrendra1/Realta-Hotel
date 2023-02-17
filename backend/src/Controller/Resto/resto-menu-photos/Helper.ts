export class Helper {
    static customFileName(req, file, callback){
        let customFile = file.originalname.split('.')[0];
        customFile = customFile + Date.now() + "-" + Math.round(Math.random()*1e9);
        let fileExtension = '';
        if(file.mimetype.indexOf('jpeg') > -1){
            fileExtension = '.jpg';
        }else if(file.mimetype.indexOf('png') > -1){
            fileExtension = '.png'
        }

        customFile = customFile+fileExtension;
        callback(null, customFile);
    }

    static storage(req, file, callback){
        callback(null, './restomenuphotos')
    }
}