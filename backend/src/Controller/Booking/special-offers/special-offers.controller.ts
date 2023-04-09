import { Body, Controller, Get, Param, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { SpecialOffersService } from 'src/Service/Booking/special-offers/special-offers.service';

@Controller('special-offers')
export class SpecialOffersController {
    constructor(private readonly SpecialOffersService : SpecialOffersService){}
    
    @Get('all')
    findAllSpecialOffers(){
        return this.SpecialOffersService.findAll()
    }

    @Get('all/:id')
    findAllId(@Param() params){
        return this.SpecialOffersService.findAllId(params.id)
    }

    @Post('create')
    createSpecialOffers(@Body() body){
        return this.SpecialOffersService.createSpecialOffers(body)
    }

    @Put('edit/:id')
    updateSpecialOffers(@Param () params, @Body() body : any){
        return this.SpecialOffersService.updateSpecialOffers(params.id, body)
    }
    
    @Delete('delete/:id')
    deleteSpecialOffers(@Param() params){
        return this.SpecialOffersService.deleteSpecialOffers(params.id)
    }
    
}
