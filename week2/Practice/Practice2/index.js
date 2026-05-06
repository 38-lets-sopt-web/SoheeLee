const input = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

todos.forEach((todo) => {
  const li = document.createElement('li');
  li.textContent = todo;
  todoList.appendChild(li);
});

addBtn.addEventListener('click', () => {
  const value = input.value;

  if (!value) return;

  const li = document.createElement('li');
  li.textContent = value;
  todoList.appendChild(li);


  todos.push(value);
  localStorage.setItem('todos', JSON.stringify(todos));

  input.value = '';
});