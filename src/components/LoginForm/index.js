

function LoginForm () {
    return (
        <div className='w-1/3  '>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='form_title mb-4 font-bold text-3xl text-center
                '>
                    Login

                </div>

                <div className='mb-4 '>
                    <label className='block text-gray-700 text-[16px] font-bold mb-2 ' htmlFor='username'>
                        Username
                    </label>
                    <input type="text"
                        className='w-full px-3 py-2  border rounded-lg text-[16px] focus:border-[#02C39A]'
                        name='username'
                    />
                </div>

                <div className='mb-6'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-[16px]' htmlFor='password '
                        name ='password'>
                        Password
                    </label>
                    <input type="password"
                        className='w-full px-3 py-2 border rounded-lg text-[16px] '
                    />

                </div>

                <div className='buttons flex justify-end '>
                    <button
                        className='px-3 py-2 bg-[#02C39A] w-full text-white text-lg rounded-lg hover:bg-[#00A896] focus:outline-none focus:shado'
                    >
                        Sign In

                    </button>

                </div>

            </form>

        </div>

    )
}

export default LoginForm