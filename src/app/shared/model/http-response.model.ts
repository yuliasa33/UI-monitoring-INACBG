import { HttpResponseBase } from "@angular/common/http";

export interface HttpResponseModel <T = any> {
    responseResult:boolean
    statusCode?:number
    message:string
    data: T
}