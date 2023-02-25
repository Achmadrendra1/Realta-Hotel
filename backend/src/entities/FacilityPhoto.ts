import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Facilities } from "./Facilities";

@Index("pk_fapho_id", ["faphoFaciId", "faphoId"], { unique: true })
@Index("facility_photo_fapho_faci_id_key", ["faphoFaciId"], { unique: true })
@Entity("facility_photo", { schema: "hotel" })
export class FacilityPhoto {
  @Column("integer", { primary: true, name: "fapho_faci_id" })
  faphoFaciId: number;

  @PrimaryGeneratedColumn({ type: "integer", name: "fapho_id" })
  faphoId: number;

  @Column("character varying", {
    name: "fapho_thumbnail_filename",
    nullable: true,
    length: 50,
  })
  faphoThumbnailFilename: string | null;

  @Column("character varying", {
    name: "fapho_photo_filename",
    nullable: true,
    length: 50,
  })
  faphoPhotoFilename: string | null;

  @Column("boolean", { name: "fapho_primary", nullable: true })
  faphoPrimary: boolean | null;

  @Column("character varying", {
    name: "fapho_url",
    nullable: true,
    length: 255,
  })
  faphoUrl: string | null;

  @Column("timestamp without time zone", {
    name: "fapho_modified_date",
    nullable: true,
  })
  faphoModifiedDate: Date | null;

  @OneToOne(() => Facilities, (facilities) => facilities.facilityPhoto, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "fapho_faci_id", referencedColumnName: "faciId" }])
  faphoFaci: Facilities;
}
