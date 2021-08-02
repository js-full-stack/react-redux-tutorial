# Навигация

## Основы Redux

1. [Basic](#basic)

2. [Create_action](#create_action)

3. [Action_creator](#action_creator)

4. [Reducer](#reducer)

## Практика

[Start](#start)

## Counter

2. [Counter-actions-creators](#counter-actions-creators)

3. [Switch-cases](#switch-cases)

4. [Remove-state-and-methods-in-the-component](#remove-state-and-methods-in-the-component)

5. [Store-access-for-a-component](#Store-access-for-a-component)

   - MapStateToProps: [Get-data-from-storage-in-a-counter](#Get-data-from-storage-in-a-counter)
   - MapDispatchToProps: [Write-changes-to-storage](#Write-changes-to-storage)

6. [Composition-reducers](#Composition-reducers)

7. [Refactoring](#Refactoring)

### Basic

Для понимания основ работы redux:

1. Создать папку redux, а в ней файл `store.js`;
2. В `store.js`:

- `import { createStore } from "redux"`;
- `const reducer = (state = {}, action) => state;`
- `const store = createStore(reducer);`
- `export default store;`

Store - это js-объект, который содержит методы, позволяющие получить (`getState`) и изменить (`dispatch`) состояние.

`Dispatch` принимает `action` в качестве параметра, который изменяет состояние и доставляет его в reducer
В объекте `state` редьюсера можно указать дефолтное значение для стейта

#### Create_action

Создадим в папке `redux` файл `actions.js` и добавим в него action:

```
export const action = {
  type: "MY_ACTION",
  payload: "my new payload"
};

export default action;

```

- `type` - обязательное свойство, определяющее имя экшна, по которому далее будет происходить поиск
- `payload` - полезная нагрузка, в которой описываются действия, которые изменяют состояние

Теперь можно получить данные из объекта action в любом компоненте таким образом: `console.log(store.dispatch(action));`

#### Action_creator

Генераторы экшенов (Action Creators) — функции, которые создают и возвращают экшны

```
export const action = (value) => ({
  type: "MY_ACTION",
  payload: value,
});

```

Такой подход позволяет динамически изменять `payload`

#### Reducer

Чтобы action мог обновиться в store, он должен дойти до редьюсера. `Reducer` - чистая функция, работающая только с синхронным кодом. Он принимает предыдущий `state` и `action`, на основе чего вычистляет и возвращает новое состояние.

`(previousState, action) => newState`

### Start

1. Установить state-manager redux `npm i redux`
2. Установить пакет для связывания Redux + React `npm i react-redux`
3. В корневом `index.js` сделать импорты `Provider`. Обернуть приложение в компонент`Provider`, заимпортировать store и передать его пропсом:

   ```
   import { Provider } from 'react-redux';
   import store from "./Redux/store";

   <Provider store={store}>
   <App />
   </Provider>
   ```

4. Добавить DevTools для работы с Redux:

- 4.1 Установить в браузере расширение Redux DevTools
- 4.2 Добавить в проект пакет <a href="https://www.npmjs.com/package/redux-devtools-extension">Redux DevTools Extension's </a> `npm install --save redux-devtools-extension`
- 4.3 Добавить `store.js` импорт `import { composeWithDevTools } from "redux-devtools-extension"`
- 4.4 Добавить вызов `composeWithDevTools` вторым аргументом в `createStore` `const store = createStore(reducer, composeWithDevTools())`

Также есть другой способ подключить Redux DevTools:

```
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

При таком варианте устанавливать npm-пакет `redux-devtools-extension` не нужно.

## Counter

Переведем компонент <a href='./src/components/Counter/CounterState.jsx'> Counter </a> на redux

1. Пропишем в `store.js` initialState - начальное значение стейта и редьюсер, которые вернет новый стейт после экшна:

```
const initialState = {};

const reducer = (state = initialState, action) => {
  return state;
};
```

#### Counter-actions-creators

2. Создадим папку Пропишем в `actions.js` 2 экшн-креэйтора для увеличения и уменьшения значения счетчика:

```
export const increment = (value) => ({
  type: "counter/Increment",
  payload: value
});

export const decrement = (value) => ({
  type: "counter/Decrement",
  payload: value
});
```

**p.s [Позднее средалем рефакторинг](#refactoring)**

#### Switch-cases

Так как редьюсер различает экшны по полю `type`, для уточнения значения этого поля сделаем ветвление в `store.js` при помощи инструкции `switch`. Также предварительно инициализируем начальное значение счетчика:

```

// Инициализируем стейт, сразу же указывая параметры счетчика в отдельном объекте. Это делается для обеспечения модульности и удобства, ведь в дальнейшем в стейте будет лежать не только counter
const initialState = {
  counter: {
    value: 0,
    step: 5,
  },
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {

    // Если type = counter/Increment, увеличиваем value на
    // значение action.payload, предварительно распыляя значение step, так как нам не нужно его менять

    case "counter/Increment":
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + payload,
        },
      };
    // Если type = counter/Decrement, уменьшаем value на
    // значение action.payload

     case "counter/Decrement":
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value - payload,
        },
      };

    // Если reducer получит action, который не может обработать, вернем state
    default:
      return state;
  }
};
```

_Примечание: пока у нас 1 state для всех потенциальных операций. Это сделано для ознакомления, но на практике не очень удобно, так как при любом обновлении приходится распылять state, чтобы не затереть значения свойств, которые не диспатчатся. [Позднее перепишем код](#Composition-reducers) так, чтобы для каждого типа операций был отдельный редьюсер_

#### Remove-state-and-methods-in-the-component

Все методы прописаны в Редаксе, поэтому удаляем их из компонента. Изначально он <a href="./src/components/CounterState/CounterState.jsx">выглядел так</a>, а теперь внутри останется только jsx-разметка:

```
const Counter = () => {
  return (
    <div className="Counter">
      <Value value="" />

      <Controls onIncrement="" onDecrement="" />
    </div>
  );
};
```

#### Store-access-for-a-component

Для доступа к хранилищу внутри компонента можно использовать HOC connect, который нужно заимпортировать в тело компонента: `import {connect} from 'react-redux`

Синтаксис:
`connect(mapStateToProps, mapDispatchToProps)(Component)`

Объявление `mapStateToProps`:

```
 const mapStateToProps = (state, props) => ({
     state: data
   });
```

где:

- `state` - весь стейт, хранящийся в `store`,
- `props` - та часть стора, которую нужно записать в пропсы.

Объявление `mapDispatchToProps`:

```
const mapDispatchToProps = dispatch => ({
  fn: data => dispatch(fn(text)),
});
```

2. `mapDispatchToProps(dispatch, fn)`, где:

   - `dispatch` - метод для отправки экшна
   - `fn` - функция, изменяющая `store`
   - `data` - данные, которые нужно изменить при экшне

#### Get-data-from-storage-in-a-counter

Пропишем метод mapStateToProps в компоненте `Counter` для доступа к стейту и извлечем оттуда значение свойства `value` и `step`

```
const mapStateToProps = (state) => {
  return {
    value: state.counter.value,
    step: state.counter.step
  };
};
```

![Пример](./images/hoc-connect.jpg)

При экспорте компонента обернем его в HOC connect, передав ему параметры для связи с хранилищем - `export default connect(mapStateToProps)(Counter)`

#### Write-changes-to-storage

Обработаем изменения счетчика. Для этого потребуется:

1. Заимпортировать в компонент [ранее созданные action-creators](#Counter-actions-creators)
2. Прописать метод `MapDispatchToProps`, который примет функцию и вернет `dispatch` с соответствующим экшном
3. Передать в анонимную функцию параметром `value` и указать это `value` как аргумент для экшн-креэйторов increment и decrement

```
 const mapDispatchToProps = (dispatch) => {
 return {
  onIncrement: (value) => dispatch(increment(value)),
  onDecrement: (value) => dispatch(decrement(value)),
 }
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

4. Прокинуть `OnIncrement` и `OnDecrement` в пропсы компонента
5. Прокинуть в компонент controls функции `onIncrement` и `onDecrement`, указав step как аргумент
6. Передать `MapDispatchToProps` 2-м аргументом в `HOC connect`

![Пример](./images/step.jpg)

Теперь начальное значение счетчика и step можно изменять динамически в хранилище

#### Composition-reducers

При масштабировании приложения поддержка стейта в одном редьюсере становится сложнее и запутаннее из за глубины вложеннсоти и многочисленности свойств, поэтому лучше использовать несколько редьюсеров, комбинируя их с помощью функции `combineReducers`. Если [раньше у нас был один initial state для всех редьюсеров](#Switch-cases), то теперь будет отдельный для конкретного типа операций. В итоге initialState и reducer для счетчика будет выглядеть следующим образом:

```

// Создаем initialState для счетчика
const counterInitialState = {
  value: 10,
  step: 15,
};

const counterReducer = (state = counterInitialState, { type, payload }) => {
  switch (type) {
    case "counter/Increment":
      return {
     // Распыляем state на случай, если в будущем изменится значение step

        ...state,
        value: state.value + payload,
      };

    case "counter/Decrement":
      return {
        ...state,
        value: state.value - payload,
      };

    default:
      return state;
  }
};

//  Инициализируем корневой редьюсер и записываем его
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Передаем rootReducer в функцию createStore
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

```

Счетчик работает, но нам все еще нужно распылять state, так как если этого не делать, а значение `step` изменится, логика сломается. Чтобы не распылать стейт, можем сделать отдельные редьюсеры для свойств `value` и `step`, объединив их в counterReducer через функцию `combineReducer`, а его в свою очередь через еще один `combineReducer` в `rootReducer`, где будут храниться все части стейта приложения, и этот rootReducer уже передать аргументов в функцию createStore:

```
const valueReducer = (state = 0, { type, payload }) => {
  switch (type) {
    case "counter/Increment":
      return state + payload;

    case "counter/Decrement":
      return state - payload;

    default:
      return state;
  }
};

const stepReducer = (state = 5, action) => state;

const counterReducer = combineReducers({
  value: valueReducer,
  step: stepReducer,
});

const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

Как видно, теперь редьюсеры максимально плоские и ничего распылять не нужно.

### Refactoring

Если логика Redux прописана в одном и том же месте, при масштабировании приложения возникнут сложности с поддержкой. Чтобы этого избежать, нужно разделить код на смысловые модули:

1. Создадим в папке `Redux` папку `Counter`
2. В папку `Counter` добавим файл `counter-actions.js` и перенесем в него [прописанные ранее экшн-креэйторы](#Counter-actions-creators) из файла `actions.js`
3. В папку `Counter` добавим файл `counter-reducer.js` и перенесем в него редьюсеры из `store.js`

```
import { combineReducers } from "redux";
import actionTypes from "./counter-types";

const valueReducer = (state = 10, { type, payload }) => {
  switch (type) {
    case "counter/Increment":
      return state + payload;

    case "counter/Decrement":
      return state - payload;

    default:
      return state;
  }
};

const stepReducer = (state = 5, action) => state;

export default combineReducers({
  value: valueReducer,
  step: stepReducer,
});

```

4. Заимпортируем редьюсер из `counter-reducer.js` в `store.js`

5. В папку `Counter` добавим файл `actions-types.js`, где зафиксируем типы экшнов

```
export const INCREMENT = "counter/Increment";
export const DECREMENT = "counter/Decrement";
```

после чего зампортируем эти данные в `counter-actions.js` и `counter-reducer.js` и будем использовать имена переменных вместо `counter/Increment` и `counter/Decrement`.

Так как вся логика счетчика уехала в [counter-reducer.js](/src/Redux/Counter/counter-reducer.js), хранилище `store.js` стало куда чище:

```
import { createStore, combineReducers } from "redux";
import counterReducer from "./Counter/counter-reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;

```
