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
        return await this.veproRepository.find()
    }

    async findVeproId(id: number): Promise<any> {
        return await this.veproRepository.find(
            { where: { veproId: id } }
        )
    }

    async addVepro(vepro: VendorProduct): Promise<any> {
        await this.veproRepository.save(
            {
                veproQtyStocked: vepro.veproQtyStocked,
                veproQtyRemaining: vepro.veproQtyRemaining,
                veproPrice: vepro.veproPrice,
                veproStock: vepro.veproStock,
                veproVendor: vepro.veproVendor,
            }
        )
        const res = await this.findAllVepro()
        return (
            { message: `Congrats, you have new Vendor Product`, result: res }
        )
    }

    async editVepro(id: number, vepro: VendorProduct): Promise<any> {
        try {
            await this.veproRepository.update({
                veproId: id
            }, {
                veproQtyStocked: vepro.veproQtyStocked,
                veproQtyRemaining: vepro.veproQtyRemaining,
                veproPrice: vepro.veproPrice,
                veproStock: vepro.veproStock,
                veproVendor: vepro.veproVendor,
            })
            return { message: `Congrats, you're vendor product has been changed` }
        } catch (error) {
            throw new HttpException({
                message: error.message
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async dropVepro(id: number): Promise<any> {
        await this.veproRepository.delete(
            { veproId: id }
        )
        return `Congrats, you're vendor product has been deleted`
    }
}
