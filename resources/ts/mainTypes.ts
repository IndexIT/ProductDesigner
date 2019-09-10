export interface IResponse {
    success: boolean;
    message?: string;
    [x: string]: any;
}