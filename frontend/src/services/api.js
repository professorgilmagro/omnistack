import axios from 'axios';
import ServerConfig from '../config/server';

const api = axios.create({
	baseURL: ServerConfig.getURL()
});

export default api;
