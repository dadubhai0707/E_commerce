import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';
import {addcart} from '../../Redux-Toolkit/Admin_User/OrderSlice'

function AboutProduct() {
    let dispatch= useDispatch()
    let navigate= useNavigate()
    let cartDetail= useSelector((state)=> state.order.addcart)
    const { productId } = useParams();
    const products = useSelector((state) => state.product.product);
    const IsUser = useSelector((state) => state.auth.IsUser);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const productFilter = products.find((data) => data.product_ID === parseInt(productId, 10));
        setProduct(productFilter || null);
    }, [products, productId]);
    // ______________________________________
    // Increment Decrement Product
    // ______________________________________
    const handleIncrement = () => {
        if(quantity=== product.Pqut){
            toast.warn("those  product only left. You cannot buy more than this!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            return
     }
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
    // ______________________________________
    // Add To Cart Product
    // ______________________________________
    let AddToCart=(pid,uid)=>{
        let date =new Date()
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let dates = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        // console.log(`${hours}:${minutes} ${dates}-${month}-${year}`)
     let addTocarst={
        cart_Id: cartDetail.length+1,    
        userId:  uid,
        productId:pid,
        isGift:false,
        quntity:quantity,
        date:`${dates}-${month}-${year}`,
        time:`${hours}:${minutes}`,
     }
     toast.success("Succesfull Add To Cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
     dispatch(addcart(addTocarst))

     navigate('/user/addCart')

    }
    return (
        <div className="product-container">
          
            <div className="product-details">
                <div className="product-image">
                    {product && <img src={`/src/assets/ProductImg/${product.Pimg}`} alt={product.Pname} />}
                </div>
                <div className="product-info">
                    <h1>{product ? product.Pname : 'Product Not Found'}</h1>
                    {product && (
                        <>
                            <p><strong>Description:</strong> {product.description}</p>
                            <p><strong>Price:</strong> ₹{product.Pprice}</p>
                            <p><strong>Color:</strong> {product.Pcolor}</p>
                            <div className="quantity-container">
                                <p><strong>Quantity:</strong></p>
                                <div className="quantity-controls">
                                    <button className="btn-quantity" onClick={handleDecrement}>-</button>
                                    <span className="quantity-value">{quantity}</span>
                                    <button className="btn-quantity" onClick={handleIncrement}>+</button>
                                </div>
                            </div>
                            <p><strong>Date Added:</strong> {new Date(product.dateAdded).toLocaleDateString()}</p>
                            <div className="product-actions">
                                <button className="btn btn-primary" onClick={()=>AddToCart(product.product_ID,IsUser.user_ID)}>Add to Cart</button>
                                <button className="btn btn-secondary">Buy Now</button>
                            </div>
                            <div className="product-reviews">
                                <h2>User Reviews</h2>
                                <p>No reviews yet. Be the first to review this product!</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AboutProduct;
