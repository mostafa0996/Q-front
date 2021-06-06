import {UserModel} from "./user.model";
import {AddressModel} from "./address.model";
import {SubCategoryModel} from "./SubCateoryModel";
import {TypeModel} from "./type.model";

export  interface OrderModel {
    _id: string;
    cost: number;
    tag: string;
    status: number;
    assignedStatus: number;
    other: number;
    weight: number;
    comments: string;
    driver: string;
    company: string;
    createdAt: string;
    user: string;
    from: string;
    to: string;
    subCategory: string;
    type: string;
    deliveryDate: string;
    userObj?: UserModel;
    companyObj?: UserModel;
    driverObj?: UserModel;
    typeObj?: TypeModel;
    fromObj?: AddressModel;
    subCategoryObj?: SubCategoryModel;
    toObj?: AddressModel;
    shipmentslogs: LogModel[];
}


export  interface LogModel {
    distance: number;
    shipment: string;
    status: number;
    time: Date;
    rejectReason: string;
    _id: string;
    to: UserModel;

}

