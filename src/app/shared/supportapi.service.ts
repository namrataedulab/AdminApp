import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class SupportapiService {
  private baseUrl = config.serverUrl;
  private supportBaseUrl = 'https://mu.admissiondesk.org/support';
  constructor(private httpClient : HttpClient) { }

  async checkSupportUser(email,name){
    try{
      return await this.httpClient.post(`${this.baseUrl}/api/support/checkSupportUser`,{"email":email,"name" : name });
      
    }catch(error) {
      this.handleError("checkSupportUser : "+error);
    }

  }

 

  getUser(){
    try{

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
      return  this.httpClient.get(`${this.baseUrl}/api/support/getUserAndTicketType`);

    }catch(error) {
      this.handleError("getUser : "+error);
    }
  }

  getUserTickets(){
    try{
      return  this.httpClient.get(`${this.baseUrl}/api/support/getUserTickets`);
    }catch(error){
      this.handleError("getUserTickets : "+error);
    }
  }
 

  getSingleTicket(uid){
    try{
      return  this.httpClient.get(`${this.baseUrl}/api/support/getSingleTicket/${uid}`);
    }catch(error) {
      this.handleError("getSingleTicket : "+error);
    }   
  }



  commentOnTicket(ticket_id,comment,role,email){
    try{
      return  this.httpClient.post(`${this.baseUrl}/api/support/addcomment`,{"comment":comment,"ticket_id":ticket_id,"role":role,"email":email});
    }catch(error) {
      this.handleError("commentOnTicket : "+error);
    }
  }

  //create new ticket
  // createTicket(subject,issue,user,group,type,priority){
  //   try{

  //     let headers = new HttpHeaders();
  //     headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
  //     //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
  //     return  this.httpClient.post(`${this.supportBaseUrl}/api/v1/tickets/create`,{"subject":subject,"owner":user,"group":group,"type":type,"issue":issue,"priority":priority},{headers : headers});

  //   }catch(error) {
  //     this.handleError("getPriority : "+error);
  //   }
  // }

  getGroups(){
    try{
      return  this.httpClient.get(`${this.baseUrl}/api/support/getGroups`);
    }catch(error) {
      this.handleError("getSingleTicket : "+error);
    } 
  }
  createTicket(subject,issue,group,owner,email){
    try{
     return  this.httpClient.post(`${this.baseUrl}/api/support/createTicket`,{"subject":subject,"issue":issue,"group":group,"owner":owner,"email":email});

    }catch(error) {
      this.handleError("getPriority : "+error);
    }
  }

    //chat
   getChatUsersList(){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
      return  this.httpClient.get(`${this.baseUrl}/api/support/getChatUsersList`,{headers : headers});

    }catch(error) {
      this.handleError("getChatUsersList : "+error);
    }
   }

    // getUserChat(){
    //   try{
    //     let headers = new HttpHeaders();
    //     headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
    //     //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
    //     return  this.httpClient.get(`${this.baseUrl}/api/support/getUserChat`,{headers : headers});
  
    //   }catch(error) {
    //     this.handleError("getUserChat : "+error);
    //   }
    // }

    getChats(requester,participants){
      try{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
        //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
        return  this.httpClient.get(`${this.baseUrl}/api/support/getChats?requester=${requester}&participants=${participants}`,{headers : headers});
  
      }catch(error) {
        this.handleError("getChats : "+error);
      }
    }
  
    //send message
    // sendMessage(chat_id, owner, message){
    //   try{
    //     let headers = new HttpHeaders();
    //     headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
    //     return  this.httpClient.post(`${this.supportBaseUrl}/api/v1/messages/send`,{'cId':chat_id,'owner':owner,'body':message},{headers : headers});
    //   }catch(error) {
    //     this.handleError("sendMessage : "+error);
    //   }  
    // }


    sendMessage(chat_id, owner, message){
      try{
        return  this.httpClient.post(`${this.baseUrl}/api/support/sendMessage`,{'cId':chat_id,'owner':owner,'body':message});
      }catch(error) {
        this.handleError("sendMessage : "+error);
      }  
    }

    updateStatus(ticket_id, status){
      try{
        return  this.httpClient.put(`${this.baseUrl}/api/support/updateStatus`,{'ticket_id':ticket_id,'status':status});
      }catch(error) {
        this.handleError("updateStatus : "+error);
      }  
    }
   
  


        // //start new conversation
        // startConversation(requester, participants){
        //   try{
        //     let headers = new HttpHeaders();
        //     headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
        //     return  this.httpClient.post(`${this.supportBaseUrl}/api/v1/messages/conversation/start`,{'requester':requester,'participants':participants},{headers : headers});
        //   }catch(error) {
        //     this.handleError("startConversation : "+error);
        //   }
        // }

  private handleError(error){
    console.error(error);
   }



}
