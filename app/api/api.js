import {API} from '../utils/Api';

export const getCities = () => API.get('/weather').then(status => status.data);
