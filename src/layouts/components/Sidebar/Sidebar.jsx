import styles from './Sidebar.module.scss'
import Stack from '@mui/material/Stack';
import { MdDashboard } from 'react-icons/md';
import { RiProjectorLine } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi';
import ButtonCpn from '../../../component/Button/Button';
import { useState } from 'react';
import Profile from '../MenuProfile/Profile';


function Sidebar({ children }) {

    const [clicked, setClicked] = useState( );

    const handleClick = (index) => {
        console.log(index)
        setClicked(index);
    };

    const Btn = [{
        title: 'Employees',
        icon: <MdDashboard className={styles.icon_title} />,
        navigate : '/employees'
    },
    {
        title: 'Projects',
        icon: <RiProjectorLine className={styles.icon_title} />,
        navigate : '/project'
    },
    {
        title: 'Leave',
        icon: <AiOutlineCalendar className={styles.icon_title} />,
        navigate : '/leave'
    },
    {
        title: 'Tracking',
        icon: <BiTimeFive className={styles.icon_title} />,
        navigate : '/tracking'
    },

    ]
    
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.header}>
                    <h2 className={styles.title}>HRM</h2>
                </div>
                <div className={styles.body_sidebar}>
                    <Stack spacing={2} direction="column">
                        {Btn.map((res, index) => (
                            <ButtonCpn key={index} title={res.title} icon={res.icon} navigate={res.navigate} handleClick={handleClick} clicked={clicked}  index={index}/> 
                        ))}
                    </Stack>
                </div>
            </div>
            <div className={styles.children}>
                {children}
            </div>
            <Profile/>
        </div>
    );
}

export default Sidebar;