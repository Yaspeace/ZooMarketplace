import { Card } from "@/Models/Card";
import { AxiosInstance } from "axios";
import { BaseApiService } from "./BaseApiService";

export class FavoritesService extends BaseApiService {

    constructor(api: AxiosInstance) {
        super(api);
    }

    public get(accId: Number): Promise<Card[]> {
        return this.api.get('/api/Favorites?account=' + accId);
    }

    public search(accId: Number, searchStr: String): Promise<Card[]> {
        return this.api.get('/api/Favorites?account=' + accId + '&search=' + searchStr);
    }

    public add(accId: Number, adId: Number): Promise<void> {
        return this.api.post('/api/Favorites', {
            account: accId,
            ad: adId
        });
    }

    public remove(accId: Number, adId: Number): Promise<void> {
        return this.api.delete('/api/Favorites?account=' + accId + '&ad=' + adId);
    }

}