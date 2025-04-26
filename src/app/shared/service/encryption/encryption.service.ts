import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';

// const CryptoJs = require('crypto-js')

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encrypt(data:any,key?:any){
    const result = CryptoJs.AES.encrypt(data,'').toString();
    return result
  }

  decrypt(data:any,key?:any){
    const result = CryptoJs.AES.decrypt(data,'').toString(CryptoJs.enc.Utf8);
    return result
  }

}
