import {API, ApiResponse} from '../utils/Api';

export const getCities = (): Promise<ApiResponse> =>
  API.get('/weather').then(status => status.data);
