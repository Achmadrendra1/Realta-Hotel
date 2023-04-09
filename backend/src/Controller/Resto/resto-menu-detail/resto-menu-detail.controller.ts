import { Controller, Get } from '@nestjs/common';
import { RestoMenuDetailService } from '../../../Service/Resto/resto-menu-detail/resto-menu-detail.service';

@Controller('resto-menu-detail')
export class RestoMenuDetailController {

    constructor(private restoMenuDetailService: RestoMenuDetailService){}

    @Get()
    getMenus(){
        return this.restoMenuDetailService.getAll()
    }
}
