import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { VendorService } from '../../../service/Purchasing/vendor/vendor.service';

@Controller('vendor')
export class VendorController {
    constructor(
        private vendorService: VendorService
    ) { }

    @Get()
    getVendor() {
        return this.vendorService.findAllVendor();
    }

    @Get(':vendorName')
    getVendorName(@Param() vendor: any) {
        return this.vendorService.findVendorName(vendor.vendorName);
    }

    @Post()
    createVendor(@Body() vendor: any) {
        return this.vendorService.addVendor(vendor);
    }

    @Put(':vendorName')
    updateVendor(@Body() vendor: any) {
        return this.vendorService.editVendor(vendor);
    }

    @Delete(':vendorName')
    deleteVendor(@Param() vendor: any) {
        return this.vendorService.dropVendor(vendor.vendorName);
    }
}
