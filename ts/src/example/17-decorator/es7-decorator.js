// 装饰器
// 作用于类的装饰器
// 当装饰的对象是类时, 我们操作的就是这个 类本身
@log
class MyClass {}
function log(target) { // target就是 类本身
	target.prototype.logger = () => `${target.name} 被调用`
}
const test = new MyClass()
console.log(test.logger());

// 由于装饰器是表达式,我们也可以在装饰器的后面再添加个参数
@log1('hi')
class MyClass1 {}
function log1(text) {
	return function (target) {
		target.prototype.logger = () => `${text}, ${target.name} 被调用`
	}
}
const test1 = new MyClass1()
console.log(test1.logger()); // hi, MyClass1 被调用

// 作用于类方法的装饰器
// 与装饰类不同, 对类方法的装饰本质是操作其描述符;  可以把此时的装饰器理解成是 Object.defineProperty(obj, prop, descriptor)的语法糖
class C {
	@readonly(false) // 只能改变仅挨着的这个方法
	method() {
		console.log('cat');
	}
	log() {
		console.log('log');
	}
}
function readonly(value) {
	return function (target, key, descriptor){
		descriptor.writable = false;
		return descriptor;
	}
}
const c = new C()
c.method = () => {
	console.log('dog');
}
c.method()
c.log = () => console.log('logger')
c.log()


@override
class A {
	method() {
		console.log('a method');
	}
}
function override() {
	class C {
		method() {
			console.log('c method');
		}
	}
	return C;
}
let a = new A()
a.method()
