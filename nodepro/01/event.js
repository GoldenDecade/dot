const EventEmitter = require('events')
const door = new EventEmitter()

door.on('open', () => {
	console.log('open');
})
door.on('open', () => {
	console.log('open1');
})
door.on('close', () => {
	console.log('close');
})
console.log(door.eventNames());
console.log(door.listenerCount('open'));
console.log(door.listeners('open'));
door.emit('open')
console.log(door.removeAllListeners('open'));
console.log(door.eventNames());
