import { Regions } from "./Regions";
import { Proviences } from "./Proviences";
export declare class Country {
    countryId: number;
    countryName: string | null;
    countryRegion: Regions;
    proviences: Proviences[];
}
