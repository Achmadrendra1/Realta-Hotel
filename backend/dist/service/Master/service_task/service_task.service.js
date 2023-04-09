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
exports.ServiceTaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ServiceTask_1 = require("../../../entities/ServiceTask");
let ServiceTaskService = class ServiceTaskService {
    constructor(serviceTaskRepository) {
        this.serviceTaskRepository = serviceTaskRepository;
    }
    async findAllServiceTask() {
        return await this.serviceTaskRepository.find({
            order: {
                setaId: 'ASC',
            },
        });
    }
    async findOneServiceTask(setaId) {
        return await this.serviceTaskRepository.findOne({
            where: {
                setaId: setaId,
            },
        });
    }
    async getServiceByJobRole(name) {
        return await this.serviceTaskRepository.find({
            where: {},
        });
    }
    async createService(data) {
        return await this.serviceTaskRepository.save(this.serviceTaskRepository.create(data));
    }
    async updateServiceTask(setaId, data) {
        return await this.serviceTaskRepository
            .update({ setaId: setaId }, data)
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
    async deleteServiceTask(setaId) {
        return await this.serviceTaskRepository
            .delete({ setaId: setaId })
            .then(() => {
            return 'success';
        })
            .catch((error) => {
            return error;
        });
    }
};
ServiceTaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ServiceTask_1.ServiceTask)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceTaskService);
exports.ServiceTaskService = ServiceTaskService;
//# sourceMappingURL=service_task.service.js.map