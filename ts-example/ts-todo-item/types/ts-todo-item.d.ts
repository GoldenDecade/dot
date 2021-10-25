// 作为类库让其他项目引用 声明文件
import Vue from 'vue'

export interface Item {
  text: string
}

export declare class TodoItem extends Vue {
  editIndex: number
  index: number
  item: Item
}
