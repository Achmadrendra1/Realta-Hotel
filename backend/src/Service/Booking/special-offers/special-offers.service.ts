import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialOffers } from 'src/entities/SpecialOffers'; 
import { Repository } from 'typeorm'; 
import * as Enum from 'src/DataEnum'

@Injectable()
export class SpecialOffersService {
    constructor(@InjectRepository(SpecialOffers)
        private SpecialOffersRepository : Repository <SpecialOffers>){
        }
        
        async findAll() : Promise <any> {
            return await this.SpecialOffersRepository.find()
        }

        async findAllId(id : number) : Promise <any> {
            return await this.SpecialOffersRepository.find({
                where : {
                    spofId : id
                }
            })
        }

        async createSpecialOffers(field : SpecialOffers) : Promise <any> {
           return await this.SpecialOffersRepository.save(
                {
                    spofName        : field.spofName,
                    spofDescription : field.spofDescription,
                    spofType        : Enum.UserType[field.spofType],
                    spofDiscount    : field.spofDiscount,
                    spofStartDate   : field.spofStartDate,
                    spofEndDate     : field.spofEndDate,
                    spofMinQty      : field.spofMinQty,
                    spofMaxQty      : field.spofMaxQty,
                    spofModifiedDate: new Date()
                    
                })
               .then((result) => {
                    return ({
                        message : `Selamat, Anda berhasil menambahkan Coupon Special Offers`,
                        return : result
                    })  
               }).catch((err) => {
                    return (`Maaf, ada kesalahan masukan` + err)
               })
        }

        async updateSpecialOffers( id : number, field : SpecialOffers) : Promise <any> {
            return await this.SpecialOffersRepository.update({
                spofId  : id
            },{
                spofName            : field.spofName,
                spofDescription     : field.spofDescription,
                spofType            : Enum.UserType[field.spofType],
                spofDiscount        : field.spofDiscount,
                spofStartDate       : field.spofStartDate,
                spofEndDate         : field.spofEndDate,
                spofMinQty          : field.spofMinQty,
                spofMaxQty          : field.spofMaxQty,
                spofModifiedDate    : new Date()
            }).then((result) => {
                return {
                    messeage :  `Selamat anda berhasil sunting Coupon Special Offers`,
                    return : result
                }
            }).catch((err) =>{
                return (`Maaf, ada kesalahan masukan` + err)
                    
            })
            
        }

        async deleteSpecialOffers(field : SpecialOffers) : Promise <any> {
            return await this.SpecialOffersRepository.delete({
                spofId  : field.spofId
            }).then((result) => {
                return {
                    messeage : `Selamat anda berhasil hapus data`,
                    return : result
                }
            }).catch((err) => {
                return (`Maaf, ada kesalahan` + err)
            })
        }
}