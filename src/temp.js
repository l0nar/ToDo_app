// Search фильтрация по имени task, независимо от регистра
// плюс дебаунс из lodash
// сортировка по названию задачи
// и по приоритету*

// читать про HOC

const arr = [
  { priority: "low", priorityNum: 3, task: "B", yes: false },
  { priority: "high", priorityNum: 1, task: "A", yes: false },
  { priority: "normal", priorityNum: 2, task: "C", yes: false },
];

const myArr = arr.map((el) => el.yes);

console.log(myArr.includes(true));
// Таблица машин
// колонки (Номер по порядку, название строка, пробег намбер, дата выпуска iso data, статус avialable(green) /pending(yellow) /sold(red) )
