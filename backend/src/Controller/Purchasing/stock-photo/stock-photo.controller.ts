import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete
} from '@nestjs/common';
import { SphoService } from 'src/service/Purchasing/stock-photo/stock-photo.service';

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
