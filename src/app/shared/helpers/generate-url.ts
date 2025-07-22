import { environment } from "../../../environments/environment";

export const generateUrl = (subUrl: string) => {
    const url = `${environment.CORS_PROXY}${encodeURIComponent(environment.COINLORE_BASE_URL + subUrl)}`;
    return url;
};