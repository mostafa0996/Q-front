import {CityModel} from "./city";
import {Category} from "./category";

export interface CostModel {
    from: string;
    to: string;
    category: string;
    price: number;
    _id: string;
    fromObj?: CityModel;
    toObj?: CityModel;
    categoryObj?: Category;
}