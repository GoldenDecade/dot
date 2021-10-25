import { Component, Prop, Watch, Emit, Vue} from "vue-property-decorator";
import { Item } from '../../types/ts-todo-item'

@Component({
	name: 'TodoItem'
})
export default class TodoItem extends Vue {
	@Prop(Number) public editIndex!: number
	@Prop(Object) public item!: Item
	@Prop(Number) public index!: number
	public get content() {
		return this.item.text
	}
	public edit (editIndex: number): void {
		this.$emit('edit', editIndex)
	}
	public ok () {
		this.$emit('ok', -1)
	}
	public del (index: number): void {
		this.$emit('del', index)
	}
	public changeHandler(event: Event): void {
		this.$emit('change', (event.target as HTMLInputElement).value)
	}
	render () {
		console.log(this)
		return <li>
			{
				this.editIndex !== this.index ?
					<span style="color: red">{this.item.text}</span>
					:
					<input
						value={this.content}
						onChange={this.changeHandler}
						type="text"
					/>
			}
			<span onClick={() => {this.edit(this.index)}}>edit</span>
			<span onClick={this.ok}>ok</span>
			<span onClick={() =>{this.del(this.index)}}>delete</span>
		</li>
	}
}
