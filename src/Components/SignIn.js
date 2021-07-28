import { auth, firebaseInstance } from '../modules/firebase';
import { FcGoogle } from "react-icons/fc";
import { LogButton } from '../styled/LogButton';


const SignIn = () => {
    const signInWithGoogle = async () => {
        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    };

    return (
        <LogButton onClick={signInWithGoogle}>
            <FcGoogle style={{ marginRight: '5px', width: '20px', height: '20px' }} />
            <span>Sign In</span>
        </LogButton>
    )
}

export default SignIn;