const config = {
	server: {
		host: '10.86.52.104',
		port: 3333,
		getURL(path = null) {
			return `http://${this.host}:${this.port}${path ? `/${path}` : ''}`;
		}
	}
};

export default config;
