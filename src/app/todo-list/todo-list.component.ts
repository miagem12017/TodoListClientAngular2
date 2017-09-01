import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  createItem(label: string) {
    this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, false);
  }

  delete() {
    this.todoListService.SERVER_DELETE_LIST(this.list.id);
  }
}
