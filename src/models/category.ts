import {SubCategoryModel} from "./SubCateoryModel";

export interface Category {
    _id: string;
    title_en: string;
    title_ar: string;
    title: string;
    icon: string;
    active: number;
    weight: number;
    SubCategories: SubCategoryModel[];

}

