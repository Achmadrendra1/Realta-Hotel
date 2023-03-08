import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete
} from '@nestjs/common';
import { VendorService } from 'src/service/Purchasing/vendor/vendor.service';

@Controller('vendor')
export class VendorController {
    constructor(
        private vendorService: VendorService
    ) { }

    @Get()
    getVendor() {
        return this.vendorService.findAllVendor()
    }

    @Get(':id')
    getVendorId(@Param() params: any) {
        return this.vendorService.findVendorId(params.id)
    }

    @Get(':name')
    getVendorName(@Param() params: any) {
        return this.vendorService.findVendorName(params.name)
    }

    @Post()
    createVendor(@Body() body: any) {
        return this.vendorService.addVendor(body)
    }

    @Put(':id')
    updateVendor(@Param() params: any, @Body() body: any) {
        return this.vendorService.editVendor(params.id, body)
    }

    @Delete(':id')
    deleteVendor(@Param() params: any) {
        return this.vendorService.dropVendor(params.id)
    }
}
