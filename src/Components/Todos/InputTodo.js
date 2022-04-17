import React from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../modules/firebase';
import styled from 'styled-components';

const InputTodo = () => {
    const uid = useSelector(state => state.user.uid);
    const onSubmit = e => {
        e.preventDefault();

        if (e.target[0].value === "") {
            alert("모든 정보를 다 입력해주세요");
            return;
        }

        const id = Date.now();
        const todoObj = {
            id: id,
            text: e.target[0].value,
            uid: uid,
            checked: false,
            dataId: ""
        }
        db.doc(`todos/${uid}${id}`).set(todoObj);

        e.target[0].value = null;
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Input type="text" placeholder="할 일을 입력하세요" />
                <Button>+</Button>
            </Form>
        </>
    )
}

const Form = styled.form`
    display : flex;
    margin-bottom : 16px;
`;

const Input = styled.input`
    width : calc(100% - 40px);
    height : 50px;
    padding : 16px;
    border : none;
    box-shadow : inset 2px 2px 5px #babecc, inset -5px -5px 10px #fff;
    border-top-left-radius : 10px;
    border-bottom-left-radius : 10px;
    outline : none;
    font-family : GmarketSansLight;
    font-size : 16px;    
`;

const Button = styled.button`
    width : 50px;
    height : 50px;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #067CF8;
    border-top-right-radius : 10px;
    border-bottom-right-radius : 10px;
    border : none;
    font-size : 32px;
    color : #f2f3f7;

    &:hover {
        opacity : 0.7;
        transition : opacity 0.25s linear;
    }
`;

export default React.memo(InputTodo);