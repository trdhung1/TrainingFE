import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss'

function ButtonCpn({ icon, title, clicked, handleClick, index, navigate }) {
console.log(typeof navigate)

    return (
        <>
            <Button variant="text" sx={{
                mt: '20px',
                display: 'flex',
                justifyContent: 'flex-start',
                backgroundColor: clicked === index ? '#FFF8E5' : '',
                '&:hover': {
                    backgroundColor: '#FFF8E5',
                },
            }} onClick={() => handleClick(index)} ><Link to={navigate} className={styles.link} style={{
                color: clicked === index ? '#F9C155' : 'black',
                ':hover': {
                    color: 'red',
                  },
            }} >{icon} {title}</Link></Button>
        </>
    );
}

export default ButtonCpn;