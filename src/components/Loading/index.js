import ClipLoader from 'react-spinners/ClipLoader'

function Loading() {
    return ( 
        <div className="
            flex w-full h-screen justify-center items-center bg-black
        ">
            <ClipLoader color={'#fff'} loading={true} size={150} />
            </div>
     );
}

export default Loading;