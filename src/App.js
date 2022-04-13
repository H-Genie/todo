import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from './store/user'
import { auth } from './modules/firebase';
import styled from 'styled-components';
import GlobalStyle from './styled/Globalstyle';
import Navigator from './Components/Nav/Navigator';
import TodosContainer from './Components/Todos/TodosContainer';

const App = () => {
    const [init, setInint] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(
                    signIn({
                        email: user.email,
                        uid: user.uid
                    })
                );
            }

            setInint(true);
        })
    }, [dispatch]);

    return (
        <>
            <GlobalStyle />
            <Container>
                <Title>To Do List</Title>
                {
                    init ? (
                        <>
                            <Navigator />
                            <TodosContainer />
                        </>
                    ) : (
                        "Loading..."
                    )
                }
            </Container>
        </>
    )
}

const Title = styled.h1`
    text-align : center;
    color : #067CF8;
    font-size : 40px;
    font-family : GmarketSansBold;
`;

const Container = styled.section`
    width : 100%;
    max-width : 480px;
    min-width : 320px;
    margin : 32px auto;
    background-color : #f2f3f7;
    box-shadow: -2px -2px 4px 0px #ffffff, 50px 50px 50px 0px rgb(0 0 0 / 25%);
    border-radius: 25px;
    padding: 25px;
`;

export default App;