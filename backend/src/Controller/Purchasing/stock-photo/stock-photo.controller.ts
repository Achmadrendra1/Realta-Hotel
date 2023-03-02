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
import { SphoService } from 'src/service/Purchasing/stock-photo/stock-photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('stock-photo')
export class SphoController {
    constructor(
        private sphoService: SphoService
    ) { }

    @Get()
    getSpho() {
        return this.sphoService.findAllSpho();
    }

    @Get(':id')
    getSphoId(@Param() params: any) {
        return this.sphoService.findSphoId(params.id);
    }

    @Get(':name')
    getSphoName(@Param() params: any) {
        return this.sphoService.findSphoName(params.name);
    }

    @Post('')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './employeephoto',
                filename(req, file, callback) {
                    const filenames = file.originalname.split('.');
                    callback(
                        null,
                        req.body.fullName + '.' + filenames[filenames.length - 1],
                    );
                },
            }),
        }),
    )

    // @Post()
    // @UseInterceptors(FilesInterceptor('files'))
    // async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    //     console.log(files);
    //     return `File's uploaded successfully`;
    // }

    @Post()
    createSpho(@Body() body: any) {
        return this.sphoService.addSpho(body);
    }

    @Put(':id')
    updateSpho(@Param() params: any, @Body() body: any) {
        return this.sphoService.editSpho(params.id, body);
    }

    @Delete(':id')
    deleteSpho(@Param() params: any) {
        return this.sphoService.dropSpho(params.id);
    }
}
