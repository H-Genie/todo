import { GrLogout } from 'react-icons/gr';
import { LogButton } from '../styled/LogButton';

const LogOut = ({ logOut }) => {
    return (
        <LogButton onClick={logOut}>
            <GrLogout style={{ marginRight: '5px', width: '20px', height: '20px' }} />
            <span>Log Out</span>
        </LogButton>
    )
}

export default LogOut;