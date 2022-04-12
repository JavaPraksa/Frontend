import { Address } from "../available-cars-display/Address";

export class VehicleFromDto {
    id !: number;
    model !: string;
    details !: string;
    price !: number;
    address !: Address;
}