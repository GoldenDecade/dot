module.exports = {
	get url() {
		return this.request.url
	},
	get body() {
		return this.response.body
	},
	set body(val) {
		this.response.body = val
	},
	get method() {
		return this.request.method
	},
	get path() {
		return this.request.path
	},
	set type(val) {
		this.response.setHeader('Content-Type', val)
	}
}
