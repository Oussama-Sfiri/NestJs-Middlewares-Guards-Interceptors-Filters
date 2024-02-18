import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope: Scope.REQUEST}) // we want to scope this service to the request and that each request that comes into the system we will get a new requestService object wherer we can set a unique userId for that given request (car ila kan scoope dyl lbean kbiiir par exemple "Application" donc kola request ghadi ikoun 3ndaha userId ou ghadi iw9e3 lina override l userId dyl had lbean dkchi 3lach derna scope hwa request bach kola request nseybo liha bean dylha)
export class RequestService {
    private userId : string;

    setUserId(userId : string) {
        this.userId = userId;
    };

    getUserId() {
        return this.userId;
    }
}