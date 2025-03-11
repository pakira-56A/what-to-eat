import { useState } from "react";
import { CompleteTodos } from "./components/CompleteTodo";
import { IncomponetTodos } from "./components/IncompleteTodo";
import { InputTodo } from "./components/InputTodo";
import "./styles.css";

export const Todo = () => {
  const [todoText, setTodoText] = useState(""); // 初期値は空文字
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);

  // ユーザーの入力値を取得
  // onChangeで発火したら引数eventの、targetのvalueに入力値が入る更新がされる
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンを押したら、投稿一覧に投稿される
  const onClickAdd = () => {
    if (todoText === "") return; // 空入力で追加ボタンを押しても、投稿されないようにする
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos); // Stateを更新
    setTodoText(""); // 投稿できたら、入力フォームが空に
  };

  // 削除ボタンを押した時の処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); // spliceで、特定のindex(消したいTodo)から１つ削除すると指定
    setIncompleteTodos(newTodos); // Stateを更新
  };

  // 完了ボタンを押した時の処理
  const onClickComplete = (index) => {
    // 未完了のTODO一覧から削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1); // spliceで、特定のindex(消したいTodo)から１つ削除すると指定

    // 完了のTODO一覧へ移動
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setcompleteTodos(newCompleteTodos); // Stateを更新
  };

  const onClickBack = (index) => {
    const newCcompleteTodos = [...completeTodos];
    newCcompleteTodos.splice(index, 1); // spliceで、特定のindex(消したいTodo)から１つ削除すると指定

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setcompleteTodos(newCcompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  // 登録できるTodoの数の上限は、５個と設定
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />

      {isMaxLimitIncompleteTodos && (
        <p style={{ color: "red" }}>
          登録できるToDoは5個までだよ〜、消化しろ〜
        </p>
      )}

      <IncomponetTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
