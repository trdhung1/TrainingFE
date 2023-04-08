import Table from './pages/Employee/Employee';
import { ToastContainer } from 'react-toastify';
import Routers from './routes/routes';
import './App.css';



function App() {


  return (
    <>
      <Routers >
        <Table />
      </Routers>
      <ToastContainer />
    </>

  )
}

export default App;
