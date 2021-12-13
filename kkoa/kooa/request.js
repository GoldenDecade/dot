module.exports = {
	get url() {
		return this.req.url
	},
	get method() {
		return this.req.method.toLowerCase()
	},
	get path() {
		return this.req.path
	}
}
