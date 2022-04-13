import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { db } from '../../modules/firebase';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { BiEditAlt, BiTrash } from "react-icons/bi";
import styled from 'styled-components';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const uid = useSelector(state => state.user.uid);

    useEffect(() => {
        db.collection("todos").where("uid", "==", uid).orderBy("dataId").onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data()
            }))
            setTodos(data)
        })
        return () => setTodos(false);
    }, [uid]);

    const updateTodo = (uid, id, text) => {
        const updatedText = prompt("메시지를 수정해주세요", text);
        if (updatedText) db.doc(`todos/${uid}${id}`).update({ text: updatedText });
    }

    const deleteTodo = (uid, id) => {
        const ok = window.confirm("메시지를 삭제할까요?");
        if (ok) db.doc(`todos/${uid}${id}`).delete();
    }

    const toggle = (uid, id, checked) => {
        checked ?
            db.doc(`todos/${uid}${id}`).update({ checked: false }) :
            db.doc(`todos/${uid}${id}`).update({ checked: true });

        checked ?
            document.getElementById(id).classList.remove('checked') :
            document.getElementById(id).classList.add('checked');
    }

    const overflow = id => {
        const contains = document.getElementById(`${id}`).classList.contains("overflow");

        if (contains === true) {
            document.getElementById(`${id}`).classList.remove("overflow");
        } else {
            document.getElementById(`${id}`).classList.add("overflow");
        }
    }

    return (
        <ul>
            {todos.map(todo =>
                <List key={todo.id}>
                    <TextContainer>
                        {todo.checked ?
                            <MdCheckBox
                                onClick={() => toggle(todo.uid, todo.id, todo.checked)}
                                style={{ color: 'rgba(6, 124, 248, 0.7)' }}
                            /> :
                            <MdCheckBoxOutlineBlank
                                onClick={() => toggle(todo.uid, todo.id, todo.checked)}
                            />
                        }
                        {todo.checked ?
                            <Text
                                id={todo.id}
                                className="checked overflow"
                                onClick={() => overflow(todo.id)}
                            >
                                {todo.text}
                            </Text> :
                            <Text
                                id={todo.id}
                                className="overflow"
                                onClick={() => overflow(todo.id)}
                            >
                                {todo.text}
                            </Text>
                        }
                    </TextContainer>
                    <Icons>
                        <BiEditAlt onClick={() => updateTodo(todo.uid, todo.id, todo.text)} />
                        <BiTrash onClick={() => deleteTodo(todo.uid, todo.id)} />
                    </Icons>
                </List>
            )}
        </ul>
    )
}

const List = styled.li`
    width : 100%;
    display : flex;
    justify-content : space-between;
    border-radius : 16px;
    padding : 16px;
    margin : 32px 0;
    background-color : #f2f3f7;
    box-shadow : -6px -6px 8px rgba(255, 255, 255, 0.9), 5px 5px 8px rgba(0, 0, 0, 0.07);
`;

const TextContainer = styled.div`
    width: calc(100% - 32px);
    display : flex;
    align-items : center;
    & svg {
        min-width : 20px;
        height : 20px;
        margin-right : 10px;
    }
`;

const Text = styled.span`
    &.overflow {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &.checked {
        color: #abb5bd;
        text-decoration: line-through;
        transition : all 0.25s linear;
    }
`;

const Icons = styled.div`
    min-width : 32px;
    display : flex;
    align-items : center;
`;

export default React.memo(Todos);