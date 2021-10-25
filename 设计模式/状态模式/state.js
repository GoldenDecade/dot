// 设计模式
class SuperMarry {
	constructor() {
		this.states = {
			jump() {console.log('跳跃!')},
			move() {console.log('移动!')},
			shoot() {console.log('射击!')},
			squat() {console.log('蹲下!')}
		}
		this._currentState = []
	}
	change(arr) {  // 更改当前动作
		this._currentState = arr
		return this
	}
	go() {
		console.log('触发动作')
		this._currentState.forEach(T => this.states[T] && this.states[T]())
		return this
	}
}
new SuperMarry()
	.change(['jump', 'shoot'])
	.go()                    // 触发动作  跳跃!  射击!
	.go()                    // 触发动作  跳跃!  射击!
	.change(['squat'])
	.go()

// 用一个对象 管理所有状态, 状态的改变时自身行为
// 内部状态改变时, 带来不同的行为变化
