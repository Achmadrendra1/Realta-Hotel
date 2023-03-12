import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMenuDetail } from 'src/entities/OrderMenuDetail';
import { OrderMenus } from 'src/entities/OrderMenus';
import { getConnection, Repository } from 'typeorm'; 
@Injectable()
export class OrderMenusService {
    constructor(
        @InjectRepository(OrderMenus) private orderMenuRepository: Repository<OrderMenus>,
        @InjectRepository(OrderMenuDetail) private orderDetailRepository: Repository<OrderMenuDetail>
    ){}

    async getOrderMenus(){
        return await this.orderMenuRepository.find();
    }

    async getOrderNumber(data:any){ 
        return await this.orderMenuRepository.query(`SELECT * FROM resto.ordermenuscomplete($1)`,[data.orderNumber])
    }
 
    async getCodeDesc(){
        const buildQuery = this.orderMenuRepository.createQueryBuilder('number_menus');
        const number = await buildQuery
            .select('number_menus.ormeOrderNumber')
            .orderBy('number_menus.ormeOrderNumber', 'DESC')
            .getOne()
        return number;
    }

    async getCode(){
        let fulldate = new Date();
        let year = fulldate.getFullYear().toString();
        let month = (fulldate.getMonth()+1);
        let monthstr = month<10 ? '0'+month : month;
        let day = fulldate.getDate();
        let daystr = day<10 ? '0'+day : day;
        let date = year+monthstr+daystr;

        let generate = 'MENUS#20230225%';

        const buildQuery = this.orderMenuRepository.createQueryBuilder('order_menus');
        const ormeOrderNumber = await buildQuery
            .select('order_menus.ormeOrderNumber')
            .where('order_menus.ormeOrderNumber LIKE :ormeOrderNumber',{ormeOrderNumber:`${generate}%`})
            .getMany();
         
        return ormeOrderNumber;
    }

    async addOrderMenus(data:OrderMenus){ 

        // // konfig buat transaction commit - rollback
        // const connection = getConnection();
        // const queryRunner = connection.createQueryRunner();
        
        // await queryRunner.connect();
        // await queryRunner.startTransaction();
        const orderNumber = data[0].summary.ormeOrderNumber;
        const date = new Date();
        const item = Number(data[0].summary.ormeTotalItem);
        const disc = Number(data[0].summary.ormeDisc);
        const amount = Number(data[0].summary.ormeTotalAmount);
        const pay = 'BO';
        const paid = 'B';
        const userid = Number(data[0].summary.ormeUser);

        let cart = data[0].detail;

        try{
            const ordermenu = await this.orderMenuRepository.query('SELECT * FROM resto.orders($1, $2, $3, $4, $5, $6, $7, $8)', [orderNumber, date, item, disc, amount, pay, paid, userid]);
            const orme_id = ordermenu[0].orders;     // get id order_menu
            // console.log('ini ordermenu ', ordermenu[0].orders);  // ambil return dari function orders

            cart.map( async (row:any) => {
                await this.orderDetailRepository.insert({
                    ormePrice: row.remeprice,
                    ormeQty: row.quantity,
                    ormeSubtotal: row.subtotal,
                    omdeOrme: orme_id,
                    omdeReme: row.remeid
                })
            })
            // commit transaction, kalau kedua insert berhasil 
            // await queryRunner.commitTransaction();
            return orme_id;
        }catch(err:any){
            // rollback transaction jika ada error
            // await queryRunner.rollbackTransaction();
            throw err;
        }finally{
            // await queryRunner.release();
        }
 
        // return await this.orderMenuRepository.query(
        //     'CALL resto.totalOrder($1, $2, $3, $4, $5)', [item, amount, pay, paid, userid]);
    }
 
    async deleteOrder(param){
        return this.orderMenuRepository.delete(param.id)
    }

    // async editOrderMenu(param:any, body:any){
    //     const date = new Date()
    //     return await this.orderMenuRepository.update(
    //         {
    //             ormeId: param.id
    //         },
    //         {
    //             ormeOrderNumber: body.ormeOrderNumber,
    //             ormeOrderDate: date,
    //             ormeTotalItem: body.ormeTotalItem,
    //             ormeTotalDiscount: body.ormeTotalDiscount,
    //             ormeTotalAmount: body.ormeTotalAmount,
    //             ormePayType: body.ormePayType,
    //             ormeCardnumber: body.ormeCardnumber,
    //             ormeIsPaid: body.ormeIsPaid,
    //             ormeModifiedDate: date,
    //             ormeUser: body.ormeUser
    //         }
    //     )
    // }
}
