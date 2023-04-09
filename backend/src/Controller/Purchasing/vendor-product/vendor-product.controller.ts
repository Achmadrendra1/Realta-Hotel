import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete
} from '@nestjs/common';
import { VeproService } from '../../../Service/Purchasing/vendor-product/vendor-product.service';

@Controller('vendor-product')
export class VeproController {
    constructor(
        private veproService: VeproService
    ) { }

    @Get()
    getVepro() {
        return this.veproService.findAllVepro()
    }

    @Get(':id')
    getVeproId(@Param() params: any) {
        return this.veproService.findVeproId(params.id)
    }

    @Post()
    createVepro(@Body() body: any) {
        return this.veproService.addVepro(body)
    }

    @Put(':id')
    updateStod(@Param() params: any, @Body() body: any) {
        return this.veproService.editVepro(params.id, body)
    }

    @Delete(':id')
    deleteVepro(@Param() params: any) {
        return this.veproService.dropVepro(params.id)
    }
}
