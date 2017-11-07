import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  private editingLabel = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  showEditModal() {
    document.getElementById('editItem' + this.item.id).style.display = 'block';
  }
  hideEditModal() {
    document.getElementById('editItem' + this.item.id).style.display = 'none';
  }
  showDeleteModal() {
    document.getElementById('deleteItem' + this.item.id).style.display = 'block';
  }
  hideDeleteModal() {
    document.getElementById('deleteItem' + this.item.id).style.display = 'none';
  }
  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  delete() {
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
  }

  setItem(label: string, newDate: Date) {
    if (label === "" && newDate === null) {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
      this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, {itemDate: newDate});
    }
    this.editLabel(false);
  }
}
