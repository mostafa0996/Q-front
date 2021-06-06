import {UserModel} from "./user.model";
import {AddressModel} from "./address.model";
import {SubCategoryModel} from "./SubCateoryModel";
import {TypeModel} from "./type.model";


export interface ShipmentModel {
  from: string;
  to: string;
  subCategory: string;
  weight: string;
  comments: string;
  category?: string;
  type: string;
  cost: number;
  _id: string;
  selectedCategory?: string;
}

export interface ShipmentDetailsModel {
  from: AddressModel;
  to: AddressModel;
  subCategoryObj: SubCategoryModel;
  weight: string;
  cost: string;
  comments: string;
  type: string;
  _id: string;
  other: number;
  status: number;
  toObj: AddressModel;
  fromObj: AddressModel;
  typeObj?: TypeModel;
  createdAt: Date;
  dispatchDate: Date;
  deliverdDate: Date;
  tag: string;


}

export class ShipmentGuestModel {
  shipment: ShipmentModel;
  user: UserModel;
  from: AddressModel;
  to: AddressModel;
  otp: number;

}
