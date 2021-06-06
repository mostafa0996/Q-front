import {Category} from "./category";

export interface SubCategoryModel {
    category: string;
    active: number;
    title_ar: string;
    title_en: string;
    icon: string;
    other: string;
    _id: string;
    categoryObj: Category;
    title?: string;
}

