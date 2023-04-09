import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    UseInterceptors,
    UploadedFiles
} from '@nestjs/common';
import { SphoService } from '../../../service/Purchasing/stock-photo/stock-photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Res } from '@nestjs/common';

@Controller('stock-photo')
export class SphoController {
    constructor(
        private sphoService: SphoService
    ) { }

    @Get()
    getSpho() {
        return this.sphoService.findAllSpho()
    }

    @Get('src/:filename')
    getSphoFile(@Param('filename') filename: string, @Res() res: any) {
        return res.sendFile(filename, {
            root: join('src', 'Service', 'Purchasing', 'stock-photo', 'photos')
        })
    }

    @Get(':id')
    getSphoId(@Param() params: any) {
        return this.sphoService.findSphoId(params.id)
    }

    @Get(':name')
    getSphoName(@Param() params: any) {
        return this.sphoService.findSphoName(params.name)
    }

    @Post('')
    @UseInterceptors(
        FilesInterceptor('sphoUrl', 10, {
            storage: diskStorage({
                destination: './src/Service/Purchasing/stock-photo/photos',
                filename(req, file, callback) {
                    let customName = file.originalname.split('.')[0] // Remove Extension
                    customName = customName + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9)
                    const ext = extname(file.originalname)
                    const filename = `${customName}${ext}`
                    callback(null, filename)
                }
            })
        })
    ) createSpho(@UploadedFiles() file: Express.Multer.File, @Body() body: any) {
        return this.sphoService.addSpho(file, body)
    }

    @Put(':id')
    updateSpho(@Param() params: any, @Body() body: any) {
        return this.sphoService.editSpho(params.id, body)
    }

    @Delete(':id')
    deleteSpho(@Param() params: any) {
        return this.sphoService.dropSpho(params.id)
    }
}
