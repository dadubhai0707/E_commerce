import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';

import { editProduct } from '../../Redux-Toolkit/Admin_User/productSlice'; // Your action to edit a product
import Aheader from '../Common/Aheader';

const EditProduct = () => {
    // Get the product ID from the route params
    const { productID } = useParams(); // Corrected to match the route parameter
    console.log(productID);

    
    // Redux variables
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.product.category);
    const subcategories = useSelector((state) => state.product.subcategory);
    const data = useSelector((state) => state.product.product);

    // Find the product by ID
    const productToEdit = data.find((product) => product.product_ID === parseInt(productID));
    
    // Formik setup
    const formik = useFormik({
        initialValues: {
            Pname: productToEdit?.Pname || '',
            Pimg: productToEdit?.Pimg || null,
            Pcolor: productToEdit?.Pcolor || '',
            Pprice: productToEdit?.Pprice || '',
            Pqut: productToEdit?.Pqut || '',
            description: productToEdit?.description || '',
            category: productToEdit?.category || '',
            subCatId: productToEdit?.subCatId || null,
        },  
        enableReinitialize: true, // Reinitialize form values when productToEdit changes
        onSubmit: (values) => {
            let updatedProduct = {
                ...productToEdit,
                subCatId: parseInt(values.subCatId),
                Pname: values.Pname,
                Pimg: values.Pimg ? values.Pimg.name : productToEdit.Pimg,
                Pcolor: values.Pcolor,
                Pprice: values.Pprice,
                Pqut: values.Pqut,
                description: values.description,
                dateAdded: productToEdit.dateAdded // Keep the original dateAdded
            };
            dispatch(editProduct(updatedProduct));
        }
    });

    // Filter Subcategories based on selected category
    const filteredSubcategories = subcategories.filter(
        (sub) => sub.catId === parseInt(formik.values.category)
    );
    

    return (
        <>
            <div className="header">
                <Aheader name={'Edit Product'} />
            </div>
            <div className="admin-add-product-form">
                <form onSubmit={formik.handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="Pname"
                            placeholder="Enter Product Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Pname}
                        />
                    </label>

                    <label>
    Category:
    <select
        name="category"
        value={formik.values.category}
        onChange={(event) => {
            formik.handleChange(event);
            formik.setFieldValue("subCatId", null); // Reset subcategory when category changes
        }}
        onBlur={formik.handleBlur}
    >
        <option value="" disabled>Select a category</option>
        {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
                {cat.name}
            </option>
        ))}
    </select>
</label>


{formik.values.category && (
    <label>
        Subcategory:
        <select
            name="subCatId"
            value={formik.values.subCatId || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        >
            <option value="" disabled>Select a subcategory</option>
            {filteredSubcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                    {sub.name}
                </option>
            ))}
        </select>
    </label>
)}

                    <label>
                        Image:
                        <input
                            type="file"
                            name="Pimg"
                            onChange={(event) => {
                                formik.setFieldValue("Pimg", event.currentTarget.files[0]);
                            }}
                            onBlur={formik.handleBlur}
                        />
                    </label>

                    <label>
                        Color:
                        <select
                            name="Pcolor"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Pcolor}
                        >
                            <option value="">Select Color</option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Blue">Blue</option>
                            <option value="Red">Red</option>
                            <option value="Green">Green</option>
                            <option value="Brown">Brown</option>
                            <option value="Silver">Silver</option>
                            <option value="Multi-color">Multi-color</option>
                        </select>
                    </label>

                    <label>
                        Price:
                        <input
                            type="number"
                            name="Pprice"
                            placeholder="Enter Product Price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Pprice}
                        />
                    </label>

                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="Pqut"
                            placeholder="Enter Product Total Available Quantity"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Pqut}
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            name="description"
                            placeholder="Write Some Text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                    </label>

                    <button type="submit" className="btn">Update Product</button>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
