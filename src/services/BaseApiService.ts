import { AxiosInstance } from "axios";

export class BaseApiService {
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    protected api: AxiosInstance;
}