import axios from 'axios';
import AppConfig from '../config/app';

const api = axios.create({
	baseURL: AppConfig.server.getURL()
});

export default api;
