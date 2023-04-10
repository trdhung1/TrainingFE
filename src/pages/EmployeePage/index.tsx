import Employee from "../../components/Employee";
import Header from "../../layouts/Header";

function EmployeePage() {
  return (
    <div className='container w-full'>
        <Header />
      <div className='flex  flex-col items-center justify-center mt-36 mx-auto'>
        <Employee />
      </div>
    </div>
  );
}

export default EmployeePage;
