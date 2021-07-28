import React from 'react';
import styled from 'styled-components';
import EditTodos from './EditTodos';
import SetTodo from './SetTodo';
import SetTodoNull from './SetTodoNull';
import Todos from './Todos';

const Main = styled.main`
    width : calc(100% - 32px);
    margin : 24px auto;
`;

const ButtonContainer = styled.div`
    display : flex;
    justify-content : flex-end;
    align-items : center;
    position : sticky;
    top : 0;

    p {
        font-size : 12px;
        color : rgba(0,0,0,0.5);
        margin-right : 10px;
    }
`;

const EditButton = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;

    & input {
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #067CF8;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #067CF8;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
`;

const TodosContainer = ({ user }) => {
    const [alignTodos, setAlignTodos] = React.useState(false);

    const toggleAlignTodos = () => setAlignTodos((prev => !prev));

    return (
        <Main>
            {
                user ? (
                    <>
                        {alignTodos ? <SetTodoNull /> : <SetTodo user={user} />}

                        <ButtonContainer>
                            <p>순서 변경</p>
                            <EditButton>
                                <input type="checkbox" onClick={toggleAlignTodos} />
                                <span className="slider round"></span>
                            </EditButton>
                        </ButtonContainer>

                        {alignTodos ? <EditTodos user={user} /> : <Todos user={user} />}
                    </>
                ) : (
                    null
                )
            }
        </Main>
    )
}

export default React.memo(TodosContainer);