import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { db } from '../../../modules/firebase';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import styled from 'styled-components';
import ReactDragList from 'react-drag-list';

const DragTodos = () => {
    const [todos, setTodos] = useState([]);
    const uid = useSelector(state => state.user.uid);

    useEffect(() => {
        db.collection("todos").where("uid", "==", uid).orderBy("dataId").get().then(querySnapshot => {
            let data = []
            querySnapshot.forEach(doc => {
                data.push(doc.data());
            })
            setTodos(data);
        })
    }, [uid])

    const setId = () => {
        const length = document.querySelector('.rc-draggable-list').firstElementChild.childElementCount;
        const parent = document.getElementsByClassName('rc-draggable-list-draggableRow');

        for (let i = 0; i < length; i++) {
            db.doc(`todos/${parent[i].lastElementChild.firstElementChild.firstElementChild.lastElementChild.id}`).update({ dataId: i });
        }
    }

    return (
        <ReactDragList
            handles={false}
            animation={0}
            dataSource={todos}
            onUpdate={setId}
            row={todo =>
                <ul style={{ width: '100%' }}>
                    <List key={todo.id}>
                        <TextContainer>
                            {todo.checked ?
                                <MdCheckBox
                                    style={{ color: 'rgba(6, 124, 248, 0.7)' }}
                                /> :
                                <MdCheckBoxOutlineBlank
                                />
                            }
                            {todo.checked ?
                                <Text
                                    id={`${todo.uid}${todo.id}`}
                                    className="checked overflow"
                                >
                                    {todo.text}
                                </Text> :
                                <Text
                                    id={`${todo.uid}${todo.id}`}
                                    className="overflow"
                                >
                                    {todo.text}
                                </Text>
                            }
                        </TextContainer>
                    </List>
                </ul>
            }
        />
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

export default DragTodos;