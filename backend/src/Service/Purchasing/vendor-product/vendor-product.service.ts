import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorProduct } from 'src/entities/VendorProduct';

@Injectable()
export class VeproService {
    constructor(
        @InjectRepository(VendorProduct)
        private veproRepository: Repository<VendorProduct>
    ) { }

    async findAllVepro(): Promise<any> {
        return await this.veproRepository.query('select * from purchasing.getALLVendorStock()')
    }

    async findVeproId(id: number): Promise<any> {
        return await this.veproRepository.query('select * from purchasing.getALLVendorStock() where vestock_id = $1', [id])
    }

    async addVepro(vepro: any): Promise<any> {
        await this.veproRepository.save(
            {
                veproQtyStocked: vepro.vestock_qty_stocked,
                veproQtyRemaining: vepro.vestock_qty_remaining,
                veproPrice: vepro.vestock_price,
                veproStock: vepro.vestock_name,
                veproVendor: vepro.vestock_vendor_id,
            }
        )
        const res = await this.findAllVepro()
        return (
            { message: `Congrats, you have new Vendor Product`, result: res }
        )
    }

    async editVepro(id: number, vepro: any): Promise<any> {
        try {
            await this.veproRepository.update({
                veproId: id
            }, {
                veproStock: vepro.vestock_name,
                veproQtyStocked: vepro.vestock_qty_stocked,
                veproQtyRemaining: vepro.vestock_qty_remaining,
                veproPrice: vepro.vestock_price
            })
            const res = await this.findVeproId(id)
            return {
                message: `Congrats, you're vendor product has been changed`,
                result: res
            }
        } catch (error) {
            throw new HttpException({
                message: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // async editVepro(data: any): Promise<any> {
    //     const res = await this.veproRepository.query(`call purchasing.update_stock_vepro($1, $2, $3, $4, $5, $6)`,
    //         [
    //             data.vestock_id,
    //             data.vestock_name,
    //             data.vestock_vendor_id,
    //             data.vestock_qty_stocked,
    //             data.vestock_qty_remaining,
    //             data.vestock_price,
    //         ]
    //     )
    //     if (res) {
    //         return { message: `Congrats, you're vendor product has been changed` }
    //     } else {
    //         return { message: 'Failed' }
    //     }
    // }

    async dropVepro(id: number): Promise<any> {
        await this.veproRepository.delete(
            { veproId: id }
        )
        return `Congrats, you're vendor product has been deleted`
    }
}
