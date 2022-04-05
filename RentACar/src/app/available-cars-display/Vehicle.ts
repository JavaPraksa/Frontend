import { Address } from "./Address";

export interface Vehicle {
    id: number
    model: string;
    details: string;
    price: number;
    address: Address;
}