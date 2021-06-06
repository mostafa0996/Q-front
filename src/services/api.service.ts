import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';


@Injectable()
export abstract class ApiService {
    private progress = new BehaviorSubject('0');
    baseUrl = environment.baseUrl;
    currentProgress = this.progress.asObservable();

    constructor(public httpClient: HttpClient) {
    }

    changeMessage(message: string) {
        this.progress.next(message);
    }

    restRequest(data: any, serverUrl: string, authtoken: string, type: string = 'POST', isJson: boolean = true, fileToUpload: FormData = null): Promise<any> {
        return new Promise((resolver, reject) => {

            const formData = fileToUpload || new FormData();
            if (data) {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        formData.append(key, data[key]);
                    }
                }
            }

            let headers = new HttpHeaders();
            headers = headers.append('Authorization', 'Bearer ' + authtoken);
            if (fileToUpload) {
                headers = headers.append('Content-Type', 'multipart/form-data');
            }else{
                headers = headers.append('Content-Type', (isJson ? 'application/json' : 'application/x-www-form-urlencoded'));
            }


            const req = new HttpRequest(type, serverUrl, (data ? JSON.stringify(data) : formData), {
                headers, reportProgress: true, responseType: 'json'
            });


            let percentDone = 0;
            this.httpClient.request(req).subscribe((httpevent: any) => {
                    // Via this API, you get access to the raw event stream.
                    // Look for upload progress events.
                    if (httpevent.type === HttpEventType.UploadProgress) {
                        // This is an upload progress event. Compute and show the % done:
                        percentDone = Math.round(100 * httpevent.loaded / httpevent.total);
                        this.changeMessage(percentDone.toString());
                    } else if (httpevent instanceof HttpResponse) {
                        resolver(httpevent.body);
                        percentDone = 0;
                        this.changeMessage(percentDone.toString());
                        // console.log('File is completely uploaded!');
                    }
                },
                (err: void) => {
                    this.handleError(err);
                    reject(err);
                },
                () => {
                    // completed event - job done after
                    percentDone = 0;
                    this.changeMessage(percentDone.toString());
                });
        });
    }

    protected handleError(error: any) {

    }
}
