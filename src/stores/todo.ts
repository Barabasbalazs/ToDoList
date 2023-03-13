import { defineStore } from 'pinia';
import { ToDoItem } from '../models/todoitem-model';
import { todoService } from '../services/todo-service';
import { reversePriority } from '../utils/item-priority';
import { useAuthStore } from './authentication';

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [] as ToDoItem[],
    todo: {} as ToDoItem,
  }),
  actions: {
    async getToDos(sort?: string, order?: string, search?: string) {
      const authStore= useAuthStore();
      const searchObj = {
        ...(sort && { sort }),
        ...(order && { order }),
        ...(search && { search }),
      };
      const resp = await todoService.getAll(
        authStore.authToken,
        searchObj
      );
      if (resp) {
        const newToDos = resp as ToDoItem[];
        newToDos.forEach((el, ind) => {
          el.priority = reversePriority(resp[ind].priority);
        });
        this.todos = resp;
        return true;
      }
      return false;
    },
    async addToDo(todo: Partial<ToDoItem>) {
      const authStore= useAuthStore();
      const resp = await todoService.addToDo(authStore.authToken, todo);
      if (resp) {
        const newToDo = resp;
        newToDo.priority = reversePriority(resp.priority);
        this.todos.push(newToDo);
        return true;
      }
      return false;
    },
    async removeToDo(index: number, todo: ToDoItem) {
      const authStore= useAuthStore();
      const resp = await todoService.removeToDo(
        authStore.authToken,
        todo._id
      );
      if (resp) {
        this.todos.splice(index, 1);
        return true;
      }
      return false;
    },
    async updateToDo(
      ind: number,
      todo: Partial<ToDoItem>,
      resolvedStatusChanged?: number
    ) {
      const authStore= useAuthStore();
      const resp = await todoService.updateToDo(authStore.authToken, todo);
      if (!resp) {
        return false;
      }
      this.todos[ind] = resp;
      this.todos[ind].priority = reversePriority(resp.priority);
      if (resolvedStatusChanged === -1) {
        this.todos.push(this.todos.splice(ind, 1)[0]);
      } else if (resolvedStatusChanged === 1) {
        this.todos.unshift(this.todos.splice(ind, 1)[0]);
      }
      return true;
    },
    resetStore () {
      this.todos = [] as ToDoItem[];
      this.todo =  {} as ToDoItem;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'todos',
        storage: localStorage,
      },
    ],
  },
});
