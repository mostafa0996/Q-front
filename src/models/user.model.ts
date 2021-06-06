import {CityModel} from "./city";
import {Category} from "./category";

export interface UserModel {
    active: number;
    city: string;
    user?: string;
    cityObj?: CityModel;
    email: string;
    first_name: string;
    last_name: string;
    _id: string;
    password: string;
    currentPassword: string;
    role: string;
    phone: string;
    company_name: string;
    categories: Category[];
    lng: string;
    lat: string;
    locationText: string;
    website: string;
    otp: string;
    trade_licence: string;
    designation: string;
    date_issue_licences: string;
    date_expired_licences: string;
    categoryWithVechiles: any[];


}


export interface ContentModel {
    about_id: number;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    image: string;
    _id: string;
}

export interface FeedbackModel {
    name: string;
    message: string;
    feedback_id: number;
    active: number;
    date?: string;

}