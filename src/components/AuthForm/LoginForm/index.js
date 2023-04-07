
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAndPassword } from '../../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Loading from '../../Loading'

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const  isLoading = useSelector((state) => state.auth.loading)

  const handleOnSubmit = async(data) => {
     await dispatch(checkUserAndPassword(data) )
      navigate('/employee')
 
  }


  return (
    <div className=''>
      <form onSubmit={handleSubmit(handleOnSubmit)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='form_title mb-4 font-bold text-3xl text-center'>
          Login
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-[16px] font-bold mb-2' htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            className={`w-full px-3 py-2 border border-[#AF87CE] rounded-lg text-[16px] focus:border-[#02C39A] ${errors.username ? 'border-red-500' : ''}`}
         
            {...register('username', { required: true })}
          />
          {errors.username && <span className='text-red-500 text-[14px]'>Username is required</span>}
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2 text-[16px]' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            className={`w-full px-3 py-2 border border-[#AF87CE] rounded-lg text-[16px] ${errors.password ? 'border-red-500' : ''}`}
            {...register('password', { required: true })}
          />
          {errors.password && <span className='text-red-500 text-[14px]'>Password is required</span>}
        </div>

        <div className='buttons flex justify-end'>
          <button
            className='px-3 py-2 bg-[#02C39A] w-full text-white text-lg rounded-lg hover:bg-[#00A896] focus:outline-none focus:shado'
            type='submit'
          >
            Sign In
          </button>
        </div>
      </form>
      
  
      {isLoading && <Loading/>}
    </div>
  )
}

export default LoginForm
