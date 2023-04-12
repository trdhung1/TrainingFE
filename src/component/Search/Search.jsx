import TextField from '@mui/material/TextField';
import styles from './Search.module.scss'

function Search({ seta }) {
    return (
        <>
            <div className={styles.search_input}>  <TextField id="outlined-basic" label="Search" variant="outlined" size="small" onChange={(e) => seta(e.target.value)} /></div>

        </>
    );
}

export default Search;