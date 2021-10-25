<template>
	<div>
		<button @click="add">add</button>
		<ul>
			<todo-item
				v-for="(item, index) in list"
				:item="item"
				:index="index"
				:key="index"
				:edit-index="editIndex"
				@edit="edit"
				@change="change"
				@ok="ok"
				@del="del"
			></todo-item>
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import TodoItem from '../components/todo-item'
import TodoItem from 'ts-todo-item'

interface Item {
	text: string
}

@Component({
	name: 'TodoPage',
	components: {
		TodoItem
	}
})
export default class TodoPage extends Vue {
	public editIndex = -1
	public list: Array<Item> = []
	public add(): void {
		this.list.push({
			text: ''
		});
		this.editIndex = this.list.length - 1;
	}
	public edit(index) {
		this.editIndex = index;
	}
	public change(content): void {
		this.list[this.editIndex]['text'] = content;
	}
	public ok() {
		this.editIndex = -1;
	}
	public del(index) {
		this.list.splice(index, 1);
	}
}
</script>

<style scoped>

</style>
