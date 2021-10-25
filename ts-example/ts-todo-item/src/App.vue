<template>
  <div id="app">
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
import { Component, Vue } from 'vue-property-decorator'
import { Item } from '../types/ts-todo-item'
import TodoItem from './components/todo-item'

@Component({
  name: 'TodoPage',
  components: {
    TodoItem
  }
})
export default class TodoPage extends Vue {
  public editIndex = -1
  public list: Array<Item> = []

  public add (): void {
    this.list.push({
      text: ''
    })
    this.editIndex = this.list.length - 1
  }

  public edit (index: number): void {
    this.editIndex = index
  }

  public change (content: string): void {
    this.list[this.editIndex].text = content
  }

  public ok (): void {
    this.editIndex = -1
  }

  public del (index: number): void {
    this.list.splice(index, 1)
  }
}
</script>
