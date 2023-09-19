import { Facilities } from './Facilities';
export declare class FacilityPhoto {
    faphoId: number;
    faphoThumbnailFilename: string | null;
    faphoPhotoFilename: string | null;
    faphoPrimary: boolean | null;
    faphoUrl: string | null;
    faphoModifiedDate: Date | null;
    faphoFaci: Facilities;
}
