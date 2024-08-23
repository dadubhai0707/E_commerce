import { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import {  Link,  useNavigate } from 'react-router-dom';
import { DropDownFilter, filterBysearch } from '../../Redux-Toolkit/Admin_User/productSlice'
import { LogoutUser} from '../../Redux-Toolkit/Admin_User/authSlice'
//
function UserSideBar() {
    // __________________________________-
    // Redux-toolkit variable 
    // __________________________________-
    const category = useSelector((state) => state.product.category);
    const subcategory = useSelector((state) => state.product.subcategory);
    const order = useSelector((state) => state.order.order)
    let addcart = useSelector((state) => state.order.addcart)
    let user = useSelector((state) => state.auth.IsUser)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    // ______________________________________________________________________________
    // Select SubCategory
    // ______________________________________________________________________________

    const [selectedCategory, setSelectedCategory] = useState([]);
    const [subCat, setSubcat] = useState('');
    useEffect(() => {
        if (selectedCategory !== '') {
            let a = subcategory.filter((data) => data.catId === Number(selectedCategory));
            setSubcat(a);
        } else {
            setSubcat([]);
        }
    }, [selectedCategory, subcategory]);


    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        if (value === "all") {
            setSubcat([]);
            dispatch(DropDownFilter(null));
        }
    };

    // __________________________________-
    // Toggle User Profile
    // __________________________________-
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (url) => {
        navigate(url)
        setAnchorEl(null);
        dispatch(url)
    };

    // __________________________________-
    // Chack How matuch add To cart
    // __________________________________-
    const [totalCart, setTotalCart] = useState(0);
    useEffect(() => {
        const userCartItems = addcart.filter((item) => item.userId === user.user_ID);
        setTotalCart(userCartItems.length);
    }, [user, addcart]);
    // __________________________________-
    // Select Catagroy
    // __________________________________-
    const GetSubDetail = (e) => {
        const value = e.target.value;
        if (value === "all") {
            dispatch(DropDownFilter(null));
        } else {
            dispatch(DropDownFilter(value));
        }
    };
    // ________________________________
    // FilterBaySearch
    // ________________________________
    const FilterBaySearch = (e) => {
        dispatch(filterBysearch(e.target.value))
    }
    // ___________________________________
    // Find Total length Order
    // ___________________________________
    const [totalOrder, setTotalOrder] = useState(0);
    useEffect(() => {
        const userOrders = order.filter(order => order.userId === user.user_ID);
        const ordersLength = userOrders.reduce((acc, curr) => acc + curr.orders.length, 0);
        setTotalOrder(ordersLength);
    }, [order, user]);

    return (
        <>
            <div className="top-user-heaader">
            <Link to={'user/home'} > <h1 >  Anant.in  </h1> </Link>
                <div className="location">
                    <p className="addresh">Delevaring To {user.Uadd.split(" - ")[3]} {user.Upin}  </p>
                    <Link  to={'/user/uplocation'} >Update Loaction</Link>
                </div>

                <div className="search-product">
                    <select id="dropdown" className="selectCatagroy" name="category" value={selectedCategory} onChange={handleChange}>
                        <option value="all">all</option>
                        {category.length > 0 ? (
                            category.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))
                        ) : (
                            <option value="all">No categories available</option>
                        )}
                    </select>

                    <select id="dropdown" className="selectCatagroy" name="subcategory" onChange={GetSubDetail}>
                        <option value="all">all</option>
                        {subCat.length > 0 ? (
                            subCat.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))
                        ) : (
                            <option value="all">Please Select Catgory</option>
                        )}
                    </select>
                    <input type="text" placeholder='search_product' onChange={FilterBaySearch} />
                </div>
                <div className="may-order-cart">
                    <div className="buy order" style={{ cursor: 'pointer' }} onClick={() => navigate('user/order')}>
                        <li>My Order  </li>
                   
                        <li>{totalOrder}</li>
                    </div>
                    <div className="buy cart-order" style={{ cursor: 'pointer' }} onClick={() => navigate('user/addCart')}>
                        <li>Add Cart  </li>
                        <li> {totalCart}</li>
                    </div>
                </div>

                <div className='profile'>
                    <IconButton
                        aria-controls={open ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        className='user-profile-icon'
                    >
                        <MdAccountCircle fontSize="40px" color='var(--white)' />
                    </IconButton>
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={()=>handleClose('user/profile')}>Profile</MenuItem>
                        <MenuItem onClick={()=>handleClose('user/myaccount')}>My Account</MenuItem>
                        <MenuItem onClick={()=> handleClose(LogoutUser())}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="bottom-user-header">
            <button className='btn user_header_button' onClick={() => navigate('/admin/dashboard')}>Go Admin</button>
            <button  className='btn user_header_button' onClick={() => navigate('/user/register')}>Register</button>
            <button  className='btn user_header_button' onClick={() => navigate('/user/login')}>Login</button>
            </div>
        </>
    )
}

export default UserSideBar
