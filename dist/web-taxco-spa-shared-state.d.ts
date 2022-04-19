import { BehaviorSubject } from "rxjs";
export declare const auth$: BehaviorSubject<{
    sessionToken: string;
    error: boolean;
    pending: boolean;
    message: string;
}>;
export declare const sharedData$: BehaviorSubject<{
    host: string;
    origin: string;
    message: string;
}>;
export declare let shareData: {};
export declare function login(username: any, password: any): void;
export declare function sendData(message: string, origin: string, host: string): void;
export declare function getData(): import("rxjs").Observable<{}>;
