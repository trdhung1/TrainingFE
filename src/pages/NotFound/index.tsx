import images from '../../assets/images';
function NotFound() {
    return (
        <div className="not-found w-full h-screen"
        >
        <img src={images.notFoundIMG} alt="Not Found"
        className="w-full h-full object-cover"
         />
        </div>
    );
}

export default NotFound;