import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/user'
import { auth } from '../../modules/firebase';
import { GrLogout } from 'react-icons/gr';
import { LogButton } from '../../styled/LogButton';

const LogOutButton = () => {
    const dispatch = useDispatch();
    const onLogOut = () => {
        auth.signOut();

        dispatch(
            logOut({
                email: null,
                uid: null
            })
        );
    }

    return (
        <LogButton onClick={onLogOut}>
            <GrLogout style={{ marginRight: '5px', width: '20px', height: '20px' }} />
            <span>Log Out</span>
        </LogButton>
    )
}

export default LogOutButton;