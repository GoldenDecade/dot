module.exports = {
	get url() {
		return this.request.url
	},
	get method() {
		return this.request.method
	},
	get body() {
		return this.response.body
	},
	set body(val) {
		this.response.body = val
	},
	set type(val) {
		this.response.type = val
	},
	get responseType() {
		return this.response.type
	}
}
