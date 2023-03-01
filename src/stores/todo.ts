import { defineStore } from 'pinia';
import { ToDoItem } from '../models/todoitem-model';

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [] as ToDoItem[],
    todo: {} as ToDoItem,
  }),
  actions: {
    //potentially searches for todos and sorts them as well
    async getToDos (searchString: string) {

    },
    async addToDo (todo: ToDoItem) {

    },
    async removeToDo (id: string) {

    },
    async updateToDo (todo: ToDoItem) {
        
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'todos',
        storage: localStorage
      }
    ]
  }
});
