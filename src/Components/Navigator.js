import React from 'react';
import styled from 'styled-components';
import SignIn from './SignIn';
import LogOut from './LogOut';

const Nav = styled.nav`
    width : calc(100% - 32px);
    height : 40px;
    display : flex;
    justify-content : space-between;
    align-items : center;
    margin : 24px auto;
`;

const LogMessage = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family : GmarketSansLight;
`;

const Navigator = ({ user, logOut }) => {
    return (
        <>
            {
                user === null ? (
                    <Nav>
                        <LogMessage>로그인 해주세요</LogMessage>
                        <SignIn />
                    </Nav>
                ) : (
                    <Nav>
                        <LogMessage>{user.email}</LogMessage>
                        <LogOut logOut={logOut} />
                    </Nav>
                )
            }
        </>
    )
}

export default React.memo(Navigator);