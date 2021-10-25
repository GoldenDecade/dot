/*
<script>
export default {
  name: 'todo-item',
  props: {
    editIndex: {
      type: Number
    },
    item: {
      type: Object
    },
    index: Number
  },
  computed: {
    content() {
      return this.item.text
    }
  },
  methods: {
    edit (editIndex) {
      console.log('edit ', editIndex)
      this.$emit('edit', editIndex)
    },
    ok () {
      this.$emit('ok', -1)
    },
    del (index) {
      this.$emit('del', index)
    },
    changeHandler(e) {
      this.$emit('change', e.target.value)
    }
  },
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
</script>
*/
import { Component, Prop, Watch, Emit, Vue} from "vue-property-decorator";

interface Item {
	text: string
}

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
	public edit (editIndex) {
		this.$emit('edit', editIndex)
	}
	public ok () {
		this.$emit('ok', -1)
	}
	public del (index) {
		this.$emit('del', index)
	}
	public changeHandler(e) {
		this.$emit('change', e.target.value)
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
