import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import styles from './Profile.module.scss'
import { CgProfile } from 'react-icons/cg'
import { BsFillKeyFill } from 'react-icons/bs'
import { CiLogout } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {

    const [visible, setVisible] = useState(false);

    const navigate = useNavigate()
    const Logout = () => {
        localStorage.removeItem('token');
        navigate("/")
        toast.success("successful logout");
    }
    return (
        <div className={styles.avatar_wapper}>
            <Avatar src="https://reqres.in/img/faces/9-image.jpg" alt='avtar' onClick={() => {
                setVisible(!visible)
            }} />

            {
                visible &&
                <div className={styles.tooltip}>
                    <div> <CgProfile /> My Profile</div>
                    <div> <BsFillKeyFill /> Change Password</div>
                    <div onClick={Logout}> <CiLogout /> Logout</div>
                </div>
            }
        </div>
    );
}

export default Profile;