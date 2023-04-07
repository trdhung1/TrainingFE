import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { register, handleSubmit,  formState: { errors } } = useForm();

  const dispatch = useDispatch()

  const handleOnSubmit = async(data) => {
     await dispatch(registerUser({
      username: data.username,
      password: data.password,
    }))
   
   
  }

  return (
    <div className=''>
      <form className='bg-white shadow-md  px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(handleOnSubmit)}>
        <div className='form_title mb-4 font-bold text-3xl text-center'>
          Sign Up
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-[16px] font-bold mb-2' htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            className={`w-full px-3 py-2 border border-[#AF87CE] rounded-lg text-[16px] focus:border-[#02C39A] 
            ${errors.username ? 'border-red-500' : ''}`}
            {...register("username", { required: true })}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className='text-red-500 text-xs mt-1'>Username is required</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-[16px] font-bold mb-2' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            className={`w-full px-3 py-2 border border-[#AF87CE] rounded-lg text-[16px] focus:border-[#02C39A] 
            ${errors.password ? 'border-red-500' : ''}`}
            {...register("password", { required: true })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className='text-red-500 text-xs mt-1'>Password is required</p>}
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 text-[16px] font-bold mb-2' htmlFor='confirmPassword'>
            Confirm Password
          </label>
          <input
            type='password'
            className={`w-full px-3 py-2 border border-[#AF87CE] rounded-lg text-[16px] focus:border-[#02C39A]
            ${errors.confirmPassword ? 'border-red-500' : ''}`}
            {...register("confirmPassword", { 
              required: true,
              validate: {
                passwordsMatch: (value) => value === password || 'Passwords do not match'
              }
            })}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className='text-red-500 text-xs mt-1'>Confirm Password is required</p>}

          
        </div>

        <div className='flex items-center justify-between'>
          <button
            className='bg-[#02C39A] hover:bg-[#00A896] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
            type='submit'
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm