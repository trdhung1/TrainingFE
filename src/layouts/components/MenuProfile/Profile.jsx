import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import styles from './Profile.module.scss'
import { CgProfile } from 'react-icons/cg'
import { BsFillKeyFill } from 'react-icons/bs'
import { CiLogout } from 'react-icons/ci'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

function Profile() {

    const [visible, setVisible] = useState(false);
 
    const Logout = () => {
        toast.success("successful logout");
        localStorage.removeItem('token');
    }

    return (
        <div className={styles.avatar_wapper}>
            <Avatar src="	https://vatek-hrm-tool.s3.ap-southeast-1.amazonaws.com/production/avatar/641022b3e7497fce56fdbcdb" alt='avtar' onClick={() => {
                setVisible(!visible)
            }} />
            {
                visible &&
                <div className={styles.tooltip}>
                    <div><Link to='profile' className={styles.link}><CgProfile /> My Profile</Link> </div>
                    <div><Link to='changepassword' className={styles.link}> <BsFillKeyFill style={{marginRight : '3px'}} />Change Password</Link>  </div>
                    <div onClick={Logout} ><Link  to='login' className={styles.link}><CiLogout /> Logout </Link> </div>
                </div>
            }
        </div>
    );
}

export default Profile;