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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityPhoto = void 0;
const typeorm_1 = require("typeorm");
const Facilities_1 = require("./Facilities");
let FacilityPhoto = class FacilityPhoto {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "fapho_id" }),
    __metadata("design:type", Number)
], FacilityPhoto.prototype, "faphoId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "fapho_thumbnail_filename",
        nullable: true,
        length: 125,
    }),
    __metadata("design:type", String)
], FacilityPhoto.prototype, "faphoThumbnailFilename", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "fapho_photo_filename",
        nullable: true,
        length: 125,
    }),
    __metadata("design:type", String)
], FacilityPhoto.prototype, "faphoPhotoFilename", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "fapho_primary", nullable: true }),
    __metadata("design:type", Boolean)
], FacilityPhoto.prototype, "faphoPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "fapho_url",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], FacilityPhoto.prototype, "faphoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "fapho_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], FacilityPhoto.prototype, "faphoModifiedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Facilities_1.Facilities, (facilities) => facilities.facilityPhotos, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "fapho_faci_id", referencedColumnName: "faciId" }]),
    __metadata("design:type", Facilities_1.Facilities)
], FacilityPhoto.prototype, "faphoFaci", void 0);
FacilityPhoto = __decorate([
    (0, typeorm_1.Index)("pk_fapho_id", ["faphoId"], { unique: true }),
    (0, typeorm_1.Entity)("facility_photo", { schema: "hotel" })
], FacilityPhoto);
exports.FacilityPhoto = FacilityPhoto;
//# sourceMappingURL=FacilityPhoto.js.map