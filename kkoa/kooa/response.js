module.exports = {
	get body() {
		return this._body
	},
	set body(val) {
		console.log('set body');
		this._body = val
	},
	setHeader(type, val) {
		debugger
		this.res.setHeader(type, val)
	}
}
