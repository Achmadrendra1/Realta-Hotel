import { Controller, Param, Body, Get, Post, Put, Delete} from '@nestjs/common';
import { StockPhotoService } from '../../../service/Purchasing/stock-photo/stock-photo.service';

@Controller('stock-photo')
export class StockPhotoController {
    constructor(
        private sphoService: StockPhotoService
    ) { }

    @Get()
    getStockPhoto() {
        return this.sphoService.findAllStockPhoto();
    }

    @Get(':sphoPhotoFilename')
    getSPhoName(@Param() sphoPhotoFilename: any) {
        return this.sphoService.findSPhoFilename(sphoPhotoFilename);
    }

    @Post()
    createStockPhoto(@Body() stockPhoto: any) {
        return this.sphoService.addStockPhoto(stockPhoto);
    }

    @Put(':sphoPhotoFilename')
    updateStockPhoto(@Body() sphoPhotoFilename: any) {
        return this.sphoService.editStockPhoto(sphoPhotoFilename);
    }

    @Delete(':sphoPhotoFilename')
    deleteStockPhoto(@Param() sphoPhotoFilename: any) {
        return this.sphoService.dropStockPhoto(sphoPhotoFilename);
    }
}
