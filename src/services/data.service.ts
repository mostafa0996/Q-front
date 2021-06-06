import {HttpClient} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {ApiService} from './api.service';
import {ContentModel, FeedbackModel, UserModel} from '../models/user.model';
import {environment} from '../environments/environment';
import {AppService} from '../app/app.service';
import {Category} from "../models/category";
import {TypeModel} from "../models/type.model";
import {CityModel} from "../models/city";
import {PaginationModel} from "../models/pagination.model";
import {SubCategoryModel} from "../models/SubCateoryModel";
import {BannerModel} from "../models/banner.model";
import {AdvantageModel} from "../models/advantage.model";
import {CostModel} from "../models/cost.model";
import {OptionList} from 'app/main/pages/dialog/permissions/permissions.component';
import {ShipmentGuestModel, ShipmentModel} from 'models/Shipment.model';
import {CounterModel, HomeAboutModel, PartnerModel, TestimonialModel} from "../models/home.model";


@Injectable({
    providedIn: 'root'
})
export class DataService extends ApiService {
    baseUrl = '';
    baseUrlFile = '';
    baseUrlDoc = '';
    progressCount = 0;
    data: any;
    image = '';
    notifyCount = 0;

    constructor(public httpClient: HttpClient, private ngZone: NgZone,
                private appService: AppService,
    ) {
        super(httpClient);

        this.baseUrl = environment.baseUrl;
        this.baseUrlFile = environment.baseUrlFile;
        this.baseUrlDoc = environment.baseUrlDoc;
        this.currentProgress.subscribe((progress: string) => {
            this.ngZone.run(() => {
                this.progressCount = Number(progress);
            });
        });
    }


    getCategories() {
        return this.restRequest(null, `${this.baseUrl}/v1/category?isPagination=false`, null, 'GET');
    }

    getStatisfics() {
        return this.restRequest(null, `${this.baseUrl}/v1/deliveryq/admin/home`, null, 'GET');
    }


    getCategoriesNews() {
        return this.restRequest(null, `${this.baseUrl}/v1/news/category?isPagination=false`, null, 'GET');
    }

    getTypes() {
        return this.restRequest(null, `${this.baseUrl}/v1/type?isPagination=false`, null, 'GET');
    }

    getAdvantage() {
        return this.restRequest(null, `${this.baseUrl}/v1/advantage`, null, 'GET');
    }

    getSubCategories() {
        return this.restRequest(null, `${this.baseUrl}/v1/sub/category`, null, 'GET');
    }

    getUsers(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/users?limit=${page.limit}&page=${page.page}&role=${page.role}&search=${page.keyword}&sortBy=${page.sortBy}&sortValue=${page.sortValue}`, null, 'GET');
    }

    getDrivers(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/users?limit=${page.limit}&page=${page.page}&role=${page.role}&search=${page.keyword}&company=${page.company}`, null, 'GET');
    }

    getOrdersByDriver(id) {
        return this.restRequest(null, `${this.baseUrl}/v1/shipments?driver=${id}`, null, 'GET');
    }


    getCounter() {
        return this.restRequest(null, `${this.baseUrl}/v1/counter?isPagination=false`, null, 'GET');
    }

    getTestimonials() {
        return this.restRequest(null, `${this.baseUrl}/v1/testimonials?isPagination=false`, null, 'GET');
    }

    getPartners() {
        return this.restRequest(null, `${this.baseUrl}/v1/partners?isPagination=false`, null, 'GET');
    }

    getHomeAbout() {
        return this.restRequest(null, `${this.baseUrl}/v1/homeContent?isPagination=false`, null, 'GET');
    }

    getReportUsers(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/shipments/orderCount?role=${page.role}`, null, 'GET');
    }


    getDurations(type: string) {
        return this.restRequest(null, `${this.baseUrl}/v1/duration?isPagination=false&type=${type}`, null, 'GET');
    }

    getCities() {
        return this.restRequest(null, `${this.baseUrl}/v1/city`, null, 'GET');
    }

    getCosts() {
        return this.restRequest(null, `${this.baseUrl}/v1/cost?limit=1000&page=0`, null, 'GET');
    }


    getUnites() {
        return this.restRequest(null, `${this.baseUrl}/v1/unit?isPagination=false`, null, 'GET');
    }

    getBanners() {
        return this.restRequest(null, `${this.baseUrl}/v1/banners`, null, 'GET');
    }

    getFeedbacks(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/contact?limit=${page.limit}&page=${page.page}&status=${page.status}&tag=${page.tag}&startDate=${page.startDate}&endDate=${page.endDate}&sortBy=${page.sortBy}&sortValue=${page.sortValue}`, null, 'GET');
    }

    getContacts(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/request??limit=${page.limit}&page=${page.page}&tag=${page.tag}&startDate=${page.startDate}&endDate=${page.endDate}&sortBy=${page.sortBy}&sortValue=${page.sortValue}`, null, 'GET');
    }

    getShipments(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/shipments?limit=${page.limit}&page=${page.page}&company=${page.company}&user=${page.user}&status=${page.status}&tag=${page.tag}&assignedStatus=${page.assignedStatus}&startDate=${page.startDate}&endDate=${page.endDate}&sortBy=${page.sortBy}&sortValue=${page.sortValue}`, null, 'GET');
    }

    getShipmentsByUser(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/shipments?limit=${page.limit}&page=${page.page}&user=${page.company}&status=${page.status}&tag=${page.tag}&assignedStatus=${page.assignedStatus}&startDate=${page.startDate}&endDate=${page.endDate}&sortBy=createdAt:desc`, null, 'GET');
    }

    getShipmentDetails(id) {
        return this.restRequest(null, `${this.baseUrl}/v1/shipments/${id}`, null, 'GET');
    }



    getContcat(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/request?limit=${page.limit}&page=${page.page}`, null, 'GET');
    }

    getScubscritopne(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/subscribers?limit=${page.limit}&page=${page.page}&tag=${page.tag}&startDate=${page.startDate}&endDate=${page.endDate}&sortBy=${page.sortBy}&sortValue=${page.sortValue}`, null, 'GET');
    }

    getSupplierByID(id) {
        return this.restRequest(null, `${this.baseUrl}/v1/users/${id}`, null, 'GET');
    }


    updateCategory(model: Category, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/category/${model._id}`, null, type);
    }

    activeSupplier(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/users/AccpectOrRejectCompanyAccount`, null, type);
    }

    updateCost(model: CostModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/cost/${model._id}`, null, type);
    }


    rejectAcceptShipment(model: PaginationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/shipments/acceptOrReject/${model.shipment}`, null, type);
    }

    updateAdvantage(model: AdvantageModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/advantage/${model._id}`, null, type);
    }

    updateShipmentStatus(model: PaginationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/shipments/${model.shipment}`, null, type);
    }

    cancelShipment(model: PaginationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/shipments/cancelShipment/${model.shipment}`, null, type);
    }

    updateCategoryNews(model: Category, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/news/category/${model._id}`, null, type);
    }

    updateType(model: TypeModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/type/${model._id}`, null, type);
    }

    updatePassword(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/users/updatePassword`, null, type);
    }

    updateProfile(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/users/profile`, null, type);
    }

    updateSubCategory(model: SubCategoryModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/sub/category/${model._id}`, null, type);
    }

    updateCity(model: CityModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/city/${model._id}`, null, type);
    }

    updateCounter(model: CounterModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/counter/${model._id}`, null, type);
    }

    updatePartner(model: PartnerModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/partners/${model._id}`, null, type);
    }


    updateTestimontial(model: TestimonialModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/testimonials/${model._id}`, null, type);
    }

    updateHomeAbout(model: HomeAboutModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/homeContent/${model._id}`, null, type);
    }

    assignDriver(model: PaginationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/shipments/assignDriver/${model.shipment}`, null, type);
    }


    updateBanner(model: BannerModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/banners/${model._id}`, null, type);
    }


    updateFeedback(model: FeedbackModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/feedback/admin/update`, null, type);
    }

    addCategory(model: Category, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/category`, null, type);
    }

    createUser(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/users`, null, type);
    }

    addCost(model: CostModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/cost`, null, type);
    }

    addCategoryNews(model: Category, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/news/category`, null, type);
    }

    addType(model: TypeModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/type`, null, type);
    }

    addCity(model: CityModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/city`, null, type);
    }

    addCounter(model: CounterModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/counter`, null, type);
    }


    addPartner(model: PartnerModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/partners`, null, type);
    }

    addHomeAbout(model: HomeAboutModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/homeContent`, null, type);
    }

    addTestimonial(model: PartnerModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/testimonials`, null, type);
    }


    addBanner(model: BannerModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/banners`, null, type);
    }

    addAdvantage(model: AdvantageModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/advantage`, null, type);
    }

    addSubCategory(model: SubCategoryModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/sub/category`, null, type);
    }


    forgetPassword(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/auth/otpSend`, null, type);
    }

    sendOTPWithOutCheck(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/auth/otpSendWithoutCheck`, null, type);
    }

    assignCompany(model: PaginationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/shipments/assignCompany/${model.shipment}`, null, type);
    }


    login(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/auth/admins/login`, null, type);
    }


    editProfile(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/users`, null, type);
    }

    getProfile() {
        return this.restRequest(null, `${this.baseUrl}/v1/users/profile`, null, 'GET');
    }

    verification(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/activate`, null, type);
    }


    resetPassword(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/auth/change-password-otp`, null, type);
    }

    uploadImage(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/v1/file/image`, null, type, false, formdata);
    }

    uploadPDF(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/v1/file/pdf`, null, type, false, formdata);
    }

    uploadTextFile(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/v1/file/base64/image`, null, type, false, formdata);
    }


    deleteUnit(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/unit/${id}`, null, type, null);
    }

    deleteDuration(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/duration/${id}`, null, type, null);
    }

    deleteCity(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/city/${id}`, null, type, null);
    }

    deleteUser(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/users/${id}`, null, type, null);
    }

    deleteTestimonial(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/testimonials/${id}`, null, type, null);
    }

    deletePartner(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/partners/${id}`, null, type, null);
    }

    deleteHomeAbout(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/homeContent/${id}`, null, type, null);
    }


    deleteCounter(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/counter/${id}`, null, type, null);
    }

    removeBanner(id, type: string = 'DELETE') {
        return this.restRequest(null, `${this.baseUrl}/v1/banners/${id}`, null, type, false);
    }


    removeCost(id, type: string = 'DELETE') {
        return this.restRequest(null, `${this.baseUrl}/v1/cost/${id}`, null, type, false);
    }

    deleteAdvantage(id, type: string = 'DELETE') {
        return this.restRequest(null, `${this.baseUrl}/v1/advantage/${id}`, null, type, false);
    }

    uploadFile(formData: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/v1/file/image`, null, type, false, formData);
    }

    addPermission(model: OptionList, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/permission`, null, type);
    }

    createShipmentGuest(model: ShipmentGuestModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/shipments/guest`, null, type);
    }


    deletePermission(model: OptionList, type: string = 'DELETE') {
        return this.restRequest(null, `${this.baseUrl}/v1/permission/${model._id}`, null, type, false);
    }

    getPermissions(id) {
        return this.restRequest(null, `${this.baseUrl}/v1/permission?user=${id}`, null, 'GET');
    }

    calculateCost(model: ShipmentModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/cost?from=${model.from}&to=${model.to}&category=${model.category}`, null, 'GET');
    }

    sendOTPGuest(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/shipments/guest/otpSend`, null, type);
    }

    getContent(type) {
        return this.restRequest(null, `${this.baseUrl}/v1//content/type/${type}`, null, 'GET');
    }

    saveContent(model: ContentModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/content/${model._id}`, null, type);
    }


    logout() {
        localStorage.removeItem('auth_deliver_admin');
        localStorage.removeItem('auth_deliver_admin_refresh');
        window.location.href = '/dashboard/#/pages/login';
    }
}
