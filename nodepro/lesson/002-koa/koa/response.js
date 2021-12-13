module.exports = {
	set body(val) {
		this.res.body = val
	},
	get body() {
		return this.res.body
	},
	set type(val) {
		this.res.setHeader('Content-Type', val)
	},
	get type() {
		return this.res.getHeader('Content-Type', 'image/*')
	}
}
