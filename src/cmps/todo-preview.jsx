import { useRef } from "react";
import { TodoEdit } from "./todo-edit";
import { useState } from "react";
import { useEffect } from "react";
import { saveTodo } from "../store/action/todo.action";
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { CgMoreO } from 'react-icons/cg';
import { utilService } from "../services/util.service";
import { Link } from "react-router-dom";


export function TodoPreview({ todo, onRemoveTodo }) {

    const colorRef = useRef(null)

    useEffect(() => {

    }, [todo.isDone])

    function setTodoIsDone() {
        todo.isDone = !todo.isDone
        try {
            saveTodo(todo)
        } catch (err) {
            console.log(err);
        }
    }

    function setTodoIsImportant() {
        todo.isImportant = !todo.isImportant
        try {
            saveTodo(todo)
        } catch (err) {
            console.log(err);
        }
    }

    return <section className="todo-preview" ref={colorRef} style={{ background: todo.color }}>
        <div className="todo-details">
            <h2 onClick={setTodoIsDone} className={todo.isDone ? 'done' : ''}>{todo.txt}</h2>
            <p>{utilService.formatTime(todo.date)}</p>
        </div>
        <div className="buttons">
            <button className="remove-btn" onClick={() => onRemoveTodo(todo._id)}><TiDelete /></button>
            <button onClick={setTodoIsImportant} className={todo.isImportant ? 'important' : 'important-btn'}>{todo.isImportant ? <AiFillExclamationCircle /> : <AiOutlineExclamationCircle />}</button>
            <Link className="details-btn" to={`/todo/${todo._id}`}><CgMoreO /></Link>
        </div>
        <TodoEdit todo={todo} colorRef={colorRef} />
    </section>
}