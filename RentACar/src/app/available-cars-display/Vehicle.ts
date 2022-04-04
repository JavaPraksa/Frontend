import { Address } from "./Address";

export interface Vehicle {
    model: string;
    details: string;
    price: number;
    address: Address;
}