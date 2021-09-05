# Навигация

## Основы Redux

1. [Basic](#basic)

2. [Создание экшнов](#create_action)

3. [Action_creators - фабрики экшнов](#action_creator)

4. [Reducer](#reducer)

## Практика

[Start](#start)

- npm
- Provider
- DevTools : способы подключения

## Counter

2. [Counter-actions-creators](#counter-actions-creators)

3. [Switch-cases](#switch-cases)

4. [Remove-state-and-methods-in-the-component](#remove-state-and-methods-in-the-component)

5. [Store-access-for-a-component](#Store-access-for-a-component)

   - MapStateToProps: [Get-data-from-storage-in-a-counter](#Get-data-from-storage-in-a-counter)
   - MapDispatchToProps: [Write-changes-to-storage](#Write-changes-to-storage)

6. [Composition-reducers](#Composition-reducers)

7. [AddSetStep](#AddSetStep)

8. [Refactoring](#Refactoring)

- [8.1 Переписываем функции и избавляемся от диспатчей в mapDispatchToProps](#Refactoring-Counter-Functions)

## [Redux_Toolkit](#Redux_Toolkit)

- [ConfigureStore](#ConfigureStore)
- [Middlware](#Middlware)
- [createAction](#createAction)
- [CreateReducer](#CreateReducer)
- [PersistStore](#PersistStore)
- [Slices](#Slices)
- [Презентационный компонент и контейнер](#Презентационный-компонент-и-контейнер)

---

### [TODOS: список задач](#Todos)

- [Обзор компонентов](#Обзор-компонентов)
- [Подключение локальной БД](#Подключение-локальной-БД)
- [CRUD-операции](#CRUD-операции)
- [Code-splitting: Вынос запросов на бекенд в файл с api-сервисами](#Code-splitting)
- [Перевод Todos на Redux(проектирование)](<#Перевод-Todos-на-Redux(проектирование)>)
- [Перевод Todos на Redux(логика редьюсеров)](<#Перевод-Todos-на-Redux(логика-редьюсеров)>)

  - [AddTodo](#AddTodo)
  - [DeleteTodo](#DeleteTodo)
  - [ToggleCompleted](#ToggleCompleted)
  - [Filter](#Filter)
  - [Перевод Todos на Toolkit](#Перевод-Todos-на-Toolkit)

## Асинхронные операции в Redux

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
- 4.4 Добавить вызов `composeWithDevTools` вторым аргументом в `createStore`
- `const store = createStore(reducer, composeWithDevTools())`

Также есть другой способ подключить Redux DevTools:

```
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

При таком варианте устанавливать npm-пакет `redux-devtools-extension` не нужно.

## Counter

Переведем компонент [Counter](./src/components/Counter/CounterStateComponent.jsx) на redux

1. Пропишем в `store.js` initialState - начальное значение стейта и редьюсер, которые вернет новый стейт после экшна:

```
const initialState = {};

const reducer = (state = initialState, action) => {
  return state;
};
```

#### Counter-actions-creators

2. Пропишем в `actions.js` 2 экшн-креэйтора для увеличения и уменьшения значения счетчика:

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

**p.s [Позднее сдалем рефакторинг](#refactoring)**

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

Все методы прописаны в Редаксе, поэтому удаляем их из компонента. Изначально он [выглядел так](src/components/Counter/CounterStateComponent.jsx), а теперь внутри останется только jsx-разметка:

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

### AddSetStep

Самую малость усложним приложение, чтобы пользователь мог динамически менять `step` счетчика через интерфейс:

1. Добавим в `Counter.jsx` разметку списка `select`:

```
<select value={step} onChange={handleChangeStep}>
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
```

2. Добавим в `actions.js` action-creator для поля `step`:

`export const step = (value) => ({ type: actions/setStep, payload: value, }); `

3. Перепишем stepReducer на такой вид:

```
const stepReducer = (state = 1, { type, payload }) => {
  switch (type) {
    case SET_STEP:
      return payload;

    default:
      return state;
  }
};
```

4. Добавим в `Counter.jsx` импорт экшн-криейтора `step`
5. Добавим новый диспатч в `mapStateToProps`:

`setStep: (value) => dispatch(step(value))`

6. В теле компонента перед `return` пропишем функцию, которая принимает `setStep` и возвращает функцию setStep с `e.target.value` и сразу же приведем `value` к числу, т.к. `select` возвращает строку:

`const handleChangeStep = (e) => setStep(Number(e.target.value))`

7. Передадим эту функцию в select на событие onChange и пропишем `step` в качестве `value`:

   `<select value={step} onChange={handleChangeStep}>`

### Refactoring

Если логика Redux прописана в одном файле, при масштабировании приложения возникнут сложности с поддержкой. Чтобы этого избежать, нужно разделить код на смысловые модули:

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

Так как вся логика счетчика уехала в [counter-reducer.js](/src/Redux/Counter/counter-reducer.js), хранилище [store.js](./src/Redux/store.js) стало куда чище:

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

### Refactoring-Counter-Functions

1. Добавим в `Counter.jsx` перед ретерном функции `handleIncrement` и `handleDecrement`, которые возвращают onIncrement и onDecrement, прописанные в mapDispatchToProps, и принимают в качестве аргумента `step` - значение, на которое нам нужно увеличивать и уменьшать счетчик, после чего передадим эти функции пропсами компоненту `Controls` вместо вызова анонимных функций, которые мы использовали ранее:

```
  const handleIncrement = () => onIncrement(step);
  const handleDecrement = () => onDecrement(step);
___________________________________________________
  <Controls
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        step={step}
      />
```

Последний этап - избавляемся от диспатчей в mapDispatchToProps. Чтобы сделать это, нужно в компоненте `Counter.jsx`:

1. Заменить `import { increment, decrement, step} from "../../Redux/Counter/counter-actions"` на `import *as actions from "../../Redux/Counter/counter-actions"`
2. Заменить

```
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: (value) => dispatch(increment(value)),
    onDecrement: (value) => dispatch(decrement(value)),
    setStep: (value) => dispatch(step(value)),
  };
};
```

На:

```
const mapDispatchToProps = {
  onIncrement: actions.increment,
  onDecrement: actions.decrement,
  setStep: actions.step,
};
```

Теперь в `mapDispatchToProps` остался объект с экшн-криэйторами, а сам `dispatch` происходит "под капотом",

Можно еще сильнее сократить код, просто передав объект с экшн-криэйторами в HOC-connect вместо mapDispatchToProps, и экшн криейтеры будут вызываться там согласно синтаксису коротких свойств объекта, но для этого придется переименовать экшн-криэйторы или передаваемые пропсы, чтобы они назывались одинаково:

![Пример](./images/shortHand.jpg)

# Redux_Toolkit

При использовании библиотеки **Redux** приходится писать много бойлерплейта. Чтобы упростить этот процесс, сосредоточившись на написании логики приложения, используется дополнительный пакет - Redux Toolkit - `npm install @reduxjs/toolkit`

## ConfigureStore

**configureStore** - функция в Redux Toolkit, которая используется вместо стандартной функции редакса **createStore** для создания хранилища. Особенности и возможности configureStore:

- аргументы передаются в виде объекта;
- редьюсер должен именоваться **reducer** и никак иначе;
- свойство **reducer** можно сделать вложенным объектом, передав несколько редьюсеров. В этом случае корневой редьюсер создастся автоматически;
- расширение для ReduxDevTools передается "под капотом", т.е. его не надо указывать в configureStore. Также в configureStore можно передать boolean `devTools: false || true`, чтобы включить или отключить девтулзы (по умолчанию - true)
- можно передавать миддлвары.

  Продолжая пример со счетчикам, применим **configureStore** для создания хранилища:

  ~~import { combineReducers } from "redux";~~
  `import { configureStore } from "@reduxjs/toolkit";`
  `import counterReducer from "./Counter/counter-reducer";`

```
const store = configureStore({

// передаем в reducer объект с редьюсером каунтера, а корневой редьюсер создается под капотом через combineReducer
reducer: {
counter: counterReducer,
},

// следующая строка оставит reduxDevTools только в режиме разработке
devTools: process.env.NODE_ENV === 'development'?
});

export default store;
```

## Middlware

В качестве примера добавим прослойку в configureStore, которая будет выводить логи при изменении состояния:

- `npm i --save redux-logger`
- `middleware: [logger]` - в объект configureStore

Поскольку значение ключа middlware - массив, внутрь можно добавить любое количество прослоек. Но здесь важно учесть, что "под капотом" Toolkit уже добавляет дефолтные прослойки для проверки на иммутабельность, сериализации и обработки асинхронных операций через **redux-thunk**. Чтобы добавить к дефолтным прослойкам кастомную, можно заимпортировать **getDefaultMiddleware** из **@reduxjs/toolkit** и объединить прослойки методом **concat**,

`middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)`

или через оператор **spread**:

`middleware: [...getDefaultMiddleware(), logger]`

Итого, `store.js` будет выглядить так:

```
import counterReducer from "./Counter/counter-reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

const middlwares = getDefaultMiddleware().concat(logger)

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: middlwares,
});

export default store;
```

## CreateAction

При использовании нативного драйвера redux нужно прописывать action-creators - функции, которые изменяют стейт. В случае с redux-toolkit есть функция, которая упрощает эту задачу - **createAction()**

Перепишем экшн-криейторы в `counter-actions.js`.

Было:

```
import { INCREMENT, DECREMENT, SET_STEP } from "./counter-types";

export const onIncrement = (payload) => ({
  type: INCREMENT,
  payload,
});

export const onDecrement = (payload) => ({
  type: DECREMENT,
  payload,
});

export const setStep = (payload) => ({
  type: SET_STEP,
  payload,
});

```

Стало:

От типов можно избавиться, так как в экшнах, которые созданы через createAction "под капотом" сформировано свойство type.
Его далее и будем использовать в редьюсерах для определения неужного экшна.
~~import { INCREMENT, DECREMENT, SET_STEP } from "./counter-types";~~

```
import { createAction } from "@reduxjs/toolkit";

export const onIncrement = createAction("counter/Increment");
export const onDecrement = createAction("counter/Decrement");
export const setStep = createAction("counter/SetStep");
```

## CreateReducer

В классическом случае редьюсеры прописываются с помощью оператора switch, где тип действия определяется в зависимости от поля type. Функция createReducer дает возможность не использовать switch/case, определяя type через синтаксис вычисляемых свойств.

Ранее файл `counterReducer.js` содержал такую логику:

```
import { combineReducers } from "redux";

const initialState = {
  value: 0,
  step: 5,
};

const valueReducer = (state = initialState.value, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return state + payload;

    case DECREMENT:
      return state - payload;

    default:
      return state;
  }
};

const stepReducer = (state = initialState.step, { type, payload }) => {
  switch (type) {
    case SET_STEP:
      return payload;

    default:
      return state;
  }
};

const counterReducer = combineReducers({
  value: valueReducer,
  step: stepReducer,
});

export default counterReducer;
```

**С функцией createReducer то же самое можно описать так:**

От типов можно избавиться полностью.
~~import { INCREMENT, DECREMENT, SET_STEP } from "./counter-types";~~

```
import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

// Вместо типов используем action-creators
import { onIncrement, onDecrement, setStep } from "./counter-actions";


const initialState = {
  value: 0,
  step: 5,
};

const valueReducer = createReducer(initialState.value, {
  [onIncrement]: (state, { payload }) => state + payload,
  [onDecrement]: (state, { payload }) => state - payload,
});

const stepReducer = createReducer(initialState.step, {
  [setStep]: (_, { payload }) => payload,
});

const counterReducer = combineReducers({
  value: valueReducer,
  step: stepReducer,
});

export default counterReducer;
```

_Store выполняет роль обертки для хранилища. Это важно при использовании React Native, так как эта технология не предоставляет доступ к localStorage_

## PersistStore

Часто при разработке приложения возникает необходимость сохранять актуальные данные в стейт даже после перезагрузки страницы. Для этого есть библиотека **redux-persist** - `npm i redux-persist`. В `store.js`:

1. `import { persistStore, persistReducer } from "redux-persist";`
2. `import storage from "redux-persist/lib/storage";`
3. Прописать persistConfig, указав ключ, под которым будут храниться данные и заимпортированный storage

```
const persistConfig = {
  key: "root",
  storage,
};
```

4. Для использования persistReducer потребуется корневой редьюсер, а значит нужно использовать combineReducer

```
const rootReducer = combineReducers({ counter: counterReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
```

5. в configureStore теперь нужно указать для ключа reducer значение persistedReducer

`reducer: persistedReducer,`

также нужно экспортировать обертку для store:

`export const persistore = persistStore(store);`

Полный код store.js:

```
import counterReducer from "./Counter/counter-reducer";
import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const middlwares = getDefaultMiddleware().concat(logger);


// в persistConfig также можно указать параметр whitelist или blacklist, чтобы персистор игнорировал или наоборот выбирал только ту часть стейта, которую нужно сохранить после перезагрузки

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  counter: persistReducer(persistConfig, counterReducer),
});



export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: middlwares,
});

export const persistore = persistStore
```

В корневом `index.js` нужно:

1. Заимпортировать `import { PersistGate } from 'redux-persist/integration/react'` - этот компонент нужен, чтобы задержать рендеринг до тех пор, пока состояние не будет сохранено в redux.
2. Обернуть приложение в PersistGate, передав полученный из `store.js` persistore как проп

```
  <PersistGate loading={null} persistor={persistor}>
        <App />
  </PersistGate>
```

Полный код index.js:

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

```

Теперь значения счетчика сохраняются после перезагрузки страницы.

В консоли можно заметить ошибку о том, связанную с попыткой поместить несериализуемые данные в хранилище. Чтобы избавиться от этой ошибки, нужно:

1. Сделать `import FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER from 'redux-persist'`
2. Добавить объект настроек в функцию getDefaultMiddleware:

```
const middlwares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}
```

## Slices

Redux Toolkit предоставляет возможность использовать слайсы для управления состоянием, что позволяет избавиться от экшн-криэйторов. Для примера создадим [копию счетчика](./src/components/Counter/CounterSlices.jsx), а также [редьюсер для него](./src/Redux/CounterSlices/counter-reducer.js), который прокинем в корневой редьюсер в `store.js`.

Counter на слайсах имеет такой синтаксис:

```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  step: 5,
};

const { actions, reducer } = createSlice({
  name: "counter/toolkit/slice",
  initialState,
  reducers: {
    onIncrement: (state, { payload }) => {
      state.value += payload;
    },
    onDecrement: (state, { payload }) => {
      state.value -= payload;
    },
    setStep: (state, { payload }) => {
      state.step = payload;
    },
  },
});

export const { onIncrement, onDecrement, setStep } = actions;
export default reducer;

```

## Презентационный компонент и контейнер

Для удобного переиспользования логики применяется паттерн разделения компонентов на презентационные (отвечают за отоброжение контента) и контейнерные (отвечают за логику). Вынесем работы с Редаксом в компонент-контейнер.

1. Создадим файл [Counter.presentational.js](./src/components/Counter/Counter.presentational.jsx) и вынесем в него разметку счетчика.
2. В [Counter.jsx](./src/components/Counter/Counter.jsx) и [CounterSlices.jsx](src/components/Counter/CounterSlices.jsx) оставим логику для связи с Redux. Сюда же заимпортируем презентационный компонент.

Теперь логика и разметка разделены, а все необходимые данные для ререндеринга презентационный компонент получает через пропсы.

![example](./images/ContainerAndPresentation.jpg)

## TODOS

### Обзор компонентов

Приложение включает такие компоненты:

- [TodoList](./src/components/Todos/TodoList/TodoList.jsx), который рендерит список задач, а также включает логику для добавления в список выполненных и удаления задач.
- [TodoEditor](./src/components/Todos/TodoEditor/TodoEditor.jsx) с контролируемой формой для добавления новых задач.
- [TodoFilter](./src/components/Todos/TodoFilter/TodoFilter.jsx) для фильтрации по названию задач.
- [Stats](./src/components/Todos/Stats/Stats.jsx) для отображения статистики общего кол-ва и кол-ва выполненных задач
- [TodosView](./src/App.js) содержит методы для удаления (**deleteTodo**), добавления новых задач (**addTodo**), добавления в список выполненных (**toggleCompleted**), фильтрации (**filterTodoList**) и отображения отфильтрованных (**getVisibleTodos**) задач, передавая компонентам необходимые данные в виде пропсов. Также **TodosView** включает стейт вида

```
const [todos, setTodos] = useState(initialTodos);
const [filter, setFilter] = useState("");
```

начальное состояние (initialTodos) приходит из файла [todos.json](./src/todos.json)

### Подключение локальной БД

Локальная база данных позволяет сымитировать AJAX-запросы при добавлении, удалении и обновлении списка задач. Для ее использования нужно:

1. Установить пакет `npm i json-server`
2. Добавить в корень проекта файл [db.json](./db.json) и перенести туда данные из `todos.json`
3. Прописать в package.json скрипт `"api-server": "json-server --delay 300 --watch db.json"`
4. Запустить сервер командой `npm run api-server`

### CRUD-операции

Для работы со списком задач необходимо сформировать соответствующие запросы:

1. Get-запрос на получение списка задач в ComponentDidMount или useEffect при 1-м рендеринге:

```
 useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then(({ data }) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);
```

2. Post-запрос на добавление новой задачи:

```
  const addTodo = (text) => {
    const todo = {
      text,
      completed: false,
    };
    axios.post("http://localhost:3000/todos", todo);
    setTodos([...todos, todo]);
  };
```

3. Delete-запрос для удаления выбранной задачи:

```
  const deleteTodo = (todoId) => {
    axios.delete(`http://localhost:3000/todos/${todoId}`).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    });
  };
```

4. Patch-запрос для обновления состояния completed:

```
  const toggleCompleted = (todoId) => {
    const currentTodo = todos.find(({ id }) => id === todoId);
    const { completed } = currentTodo;

    axios
      .patch(`http://localhost:3000/todos/${todoId}`, {
        completed: !completed,
      })
      .then(({ data }) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === data.id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      });
  };
```

### Code-splitting

![Example](./images/apiSplitting.jpg)

### Перевод Todos на Redux(проектирование)

Переводим работу с логикой заметок в Redux-хранилище. Для этого используем [отдельный компонент](./src/views/TodosViewRedux.jsx), чтобы не портить тот, в котором работа с todo реализована через json-server (изначально реализация будет локальной)

Изначально компонент будет пустым, и последовательно передадим ему необходимую логику из Редакса:

```
import { useState, useEffect } from "react";
import TodoFilter from "../components/Todos/TodoFilter";
import TodoList from "../components/Todos/TodoList";
import TodoEditor from "../components/Todos/TodoEditor";
import Stats from "../components/Todos/Stats";

const TodosViewRedux = () => {
  return (
    <>
      <p>TODO-REDUX</p>
    </>
  );
};
```

1. Создание экшнов в [todos-types.js](src/Redux/Todos/todos-types.js):

```
export const ADD = "todos/Add";
export const DELETE = "todos/Delete";
export const TOGGLE_COMPLETED = "todos/ToggleCompleted";
export const CHANGE_FILTER = "todos/ChangeFilter";

```

2. Создание редьюсеров в [todos-reducer.js](./src/Redux/Todos/todos-reducer.js)

Стейт для todos включает список заметок и фильтр. Для начала спроектируем хранилище, "склеим" через combineReducers и передадим в корневой редьюсер в store.js

Проектирование в **todos-reducer.js**:

```
import { combineReducers } from "redux";

const items = (state = [], action) => {
  return state;
};

const filter = (state = [], action) => {
  return state;
};

export default combineReducers({
  items,
  filter,
});

```

Добавление в корневой редьюсер в **store.js**:

```
const rootReducer = combineReducers({
  counter: persistReducer(persistConfig, counterReducer),
  counterSlices: counterSlicesReducer,
  todos: todosReducer,
});
```

### Перевод Todos на Redux(логика редьюсеров)

1. #### AddTodo
   - в **todos.actions.js**:

```
import shortid from "shortid";
import { ADD } from "./todos-types";

export const addTodo = (text) => ({
  type: ADD,
  payload: {
    id: shortid.generate(),
    text,
    completed: false,
  },
});
```

в **todos-reducer.js**:

```
import { ADD } from "./todos-types";

const items = (state = [], { type, payload }) => {
  switch (type) {
    case ADD:
      return [...state, payload];

    default:
      return state;
  }
};
```

Так как используется редакс, нет нужды прокидывать метод для добавления todo через **TodosView** в [TodoEditor](./src/components/TodosRedux/TodoEditor/TodoEditor.jsx), ведь его можно подписать на store и законнектить напрямую. Для этого достаточно:

1. Заимпортировать HOC connect `import { connect } from "react-redux";`
2. Заимпортировать экшн-криейтор AddTodo `import { addTodo } from "../../../Redux/Todos/todos-actions";`
3. Прописать mapDispatchToProps и передать onSubmit пропом для добавления новой todo:

```
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (text) => dispatch(addTodo(text)),
});

// вместо mapStateToProps передаем null, т.к. здесь нужен только mapDispatchToProps
export default connect(null, mapDispatchToProps)(TodoEditor);
```

![expl](./images/stepByStep.jpg)

#### DeleteTodo

**ActionCreator:**

```
export const deleteTodo = (todoId) => ({
  type: DELETE,
  payload: todoId,
});

```

**Reducer** прописывается в том же Switch-Case, что и addTodo, т.к. это работа с той же коллекцией:

```
const items = (state = [], { type, payload }) => {
  switch (type) {
    case ADD:
      return [...state, payload];

    case DELETE:
      return state.filter(({ id }) => id !== payload);
    default:
      return state;
  }
};
```

Отрисовка через map происходит в компоненте [TodoList](./src/components/TodosRedux/TodoList/TodoList.jsx). Как и TodoEditor, он должен напрямую подключаться к хранилищу.

```
const mapStateToProps = (state) => ({
  todos: state.todos.items,
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteTodo: (todoId) => dispatch(deleteTodo(todoId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

В `mapStateToProps` компонент TodoList получает весь стейт, передавая его в пропсы, после чего происходит отрисовка тудушек. `mapDispatchToProps` же отвечает за удаление тудушек. А поскольку после удаления меняются пропсы, то происходит повторный рендеринг и обновление интерфейса.

#### ToggleCompleted

**ActionCreator:**

```
export const toggleCompleted = (todoId) => ({
  type: TOGGLE_COMPLETED,
  payload: todoId,
});

```

**Dispatch:**

```
   case TOGGLE_COMPLETED:
      return state.map((todo) =>
        todo.id === payload ? { ...todo, completed: !todo.completed } : todo
      );

```

И осталось только добавить диспатч в компоненте [TodoList](./src/components/TodosRedux/TodoListRedux/TodoListRedux.jsx)::

```
const mapStateToProps = (state) => ({
  todos: state.todos.items,
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
  onToggleCompleted: (todoId) => dispatch(toggleCompleted(todoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListRedux);

```

#### Filter

**ActionCreator:**

```
export const changeFilter = (value) => ({
  type: CHANGE_FILTER,
  payload: value,
});

```

**Dispatch:**

```

const filter = (state = "", { type, payload }) => {
  switch (type) {
    case CHANGE_FILTER:
      return payload;

    default:
      return state;
  }
};

```

В компоненте [TodoFilter](./src/components/TodosRedux/TodoFilterRedux/TodoFilterRedux.jsx)

```
const mapStateToProps = (state) => ({
  value: state.todos.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilter: (e) => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilterRedux);
```

Чтобы отрисовка изменялась в зависимости от значения фильтра, необходимо немного изменить логику компонента TodoList, где мы получаем доступ ко всему списку задач:

```
//* Пишем функцию для нормализации и фильтрации
const getVisibleTodos = (allTodos, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allTodos.filter(({ text }) =>
    text.toLowerCase().includes(normalizedFilter)
  );
};

//  * Получаем список задач и фильтр из стейта и пропускаем через функцию для нормализации
const mapStateToProps = (state) => {
  const { filter, items } = state.todos;
  const visibleTodos = getVisibleTodos(items, filter);

  return {
    // * Возваращем отфильтрованные и нормализованные тудушки
    todos: visibleTodos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
  onToggleCompleted: (todoId) => dispatch(toggleCompleted(todoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListRedux);

```

### Перевод Todos на Toolkit

[CreateActions]('./../src/Redux/Todos/todos-actions.js'):

```
import shortid from "shortid";
import { createAction } from "@reduxjs/toolkit";

// * Если payload представляет собой сложный объект (как в addTodo), для передачи всех свойств нужно использовать prepare callback
export const addTodo = createAction("todos/Add", (text) => ({
  payload: {
    id: shortid.generate(),
    text,
    completed: false,
  },
}));
export const deleteTodo = createAction("todos/Delete");
export const toggleCompleted = createAction("todos/ToggleCompleted");
export const changeFilter = createAction("todos/ChangeFilter");

```

[CreateReducers](./src/Redux/Todos/todos-reducer.js)

```
import { createReducer } from "@reduxjs/toolkit";
import {
  addTodo,
  deleteTodo,
  toggleCompleted,
  changeFilter,
} from "./todos-actions";

const items = createReducer([], {
  [addTodo]: (state, action) => [...state, action.payload],

  [deleteTodo]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),

  [toggleCompleted]: (state, action) =>
    state.map((todo) =>
      todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    ),
});

const filter = createReducer("", {
  [changeFilter]: (state, action) => action.payload,
});

```
