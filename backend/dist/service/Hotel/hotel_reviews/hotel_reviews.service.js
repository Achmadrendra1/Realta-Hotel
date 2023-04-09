"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const HotelReviews_1 = require("../../../entities/HotelReviews");
const typeorm_2 = require("typeorm");
let HotelReviewsService = class HotelReviewsService {
    constructor(hotelReviewsRepository) {
        this.hotelReviewsRepository = hotelReviewsRepository;
    }
    async findAllHotelsReviews() {
        return await this.hotelReviewsRepository.find();
    }
    async findReviewById(hotel) {
        return await this.hotelReviewsRepository.findOneBy({
            horeId: hotel.horeId,
        });
    }
    async addNewHotelReviews(hotel) {
        return await this.hotelReviewsRepository
            .save({
            horeUserReview: hotel.horeUserReview,
            horeRating: hotel.horeRating,
            horeCreatedOn: hotel.horeCreatedOn,
            horeHotel: hotel.horeHotel,
            horeUser: hotel.horeUser,
        })
            .then((result) => {
            return {
                message: `Hotel Reviews successfuly added to the system`,
                result: result,
            };
        })
            .catch((error) => {
            return `failed adding Hotel Reviews to the system` + error;
        });
    }
    async UpdateHotelReviews(Id, hotel) {
        return await this.hotelReviewsRepository
            .update({
            horeId: Id,
        }, {
            horeUserReview: hotel.horeUserReview,
            horeRating: hotel.horeRating,
            horeCreatedOn: hotel.horeCreatedOn,
            horeHotel: hotel.horeHotel,
            horeUser: hotel.horeUser,
        })
            .then((result) => {
            return {
                message: `Hotel reviews successfully updated`,
                result: result,
            };
        })
            .catch((err) => {
            return `Failed to Update Hotel reviews`;
        });
    }
    async deleteHotelsReviews(id) {
        await this.hotelReviewsRepository
            .delete({
            horeId: id.horeId,
        })
            .then((result) => {
            return {
                message: `Hotels Reviews successfully deleted`,
                result: result,
            };
        })
            .catch((error) => {
            return `Failed to Delete` + error;
        });
    }
};
HotelReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(HotelReviews_1.HotelReviews)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HotelReviewsService);
exports.HotelReviewsService = HotelReviewsService;
//# sourceMappingURL=hotel_reviews.service.js.map