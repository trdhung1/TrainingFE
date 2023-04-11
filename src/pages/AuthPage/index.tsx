import LoginForm from '../../components/AuthForm/LoginForm'

function AuthPage() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-orange-200'>
           <LoginForm/>
        </div>
     )
}

export default AuthPage