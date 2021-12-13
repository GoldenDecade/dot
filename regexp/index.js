// 字符串中 能够使用正则的方法: replace

function escapeHTML(str) {
	var escapeChars = {
		'<': 'lt',
		'>': 'gt',
		'"': 'quot',
		'&': 'amp',
		'\'': '#39'
	}
	return str.replace(new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g'), function (match){
		return '&'+escapeChars[match]+';'
	})
}

console.log(escapeHTML('<h1>sdfwe</h1>'));

(/[<](\w+?)[>].*?[<][/](\1)[>]/).test("<title>regular expression</title>")
