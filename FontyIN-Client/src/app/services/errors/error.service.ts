import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  	getClientMessage(error: Error): string {
		return error.message ? error.message : error.toString();
  	}

  	getServerMessage(error: HttpErrorResponse): string {
		let message = `Error Code: ${error.status},  Message: ${error.error}`
		return message;
  	} 
}
