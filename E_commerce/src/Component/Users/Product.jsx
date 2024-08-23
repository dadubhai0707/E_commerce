import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Product() {
    let product = useSelector((state) => state.product.product);
  let  searchWhithDropDown =useSelector((state)=>state.product.searchWhithDropDown)
  let searchWhithInput =useSelector((state)=>state.product.searchWhithInput)
  const [filteredProducts, setFilteredProducts] = useState(product);
  
  let navigate= useNavigate()
  let ShowProduct=(id)=>{
      navigate(`/user/products/${id}`)
    }
    // ___________________________________________
    // Search By DropDown
    // ___________________________________________
    useEffect(() => {
        if (searchWhithDropDown) {
            let filteredProducts = product.filter((val) => val.subCatId === Number(searchWhithDropDown));
            setFilteredProducts(filteredProducts);
        } else {
            setFilteredProducts(product); 
        }
    }, [searchWhithDropDown, product]);
      // ___________________________________________
    // Search By Input 
    // ___________________________________________
    useEffect(()=>{
        if (searchWhithInput) {
            let filteredProducts = product.filter((val) => val.Pname.toLowerCase().includes(searchWhithInput.toLowerCase()));
            setFilteredProducts(filteredProducts);
        } else {
            setFilteredProducts(product); 
        }
    },[searchWhithInput,product])
return (    
    <div className="user-cards-container">
    {filteredProducts.map((data, index) => (
        <div className="card" key={index} onClick={() => ShowProduct(data.product_ID)}>
            <div className="img">
                <img
                    src={`/src/assets/ProductImg/${data.Pimg}`}
                    alt={`${data.Pname} image`}
                />
            </div>
            <div className="name">{data.Pname}</div>
            <div className="descriptions">
                <p className="price">₹{data.Pprice}<sup>00</sup> </p>
                <p><strong>Description:</strong> {data.description}</p>
            </div>
        </div>
    ))}
</div>
    );
}

export default Product;
