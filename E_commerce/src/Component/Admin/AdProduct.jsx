import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AddProduct } from '../../Redux-Toolkit/Admin_User/productSlice'; // Assume this is your action to add a product

const AdProduct = () => {
  // Redux variables
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.category);
  const subcategories = useSelector((state) => state.product.subcategory);
  const data = useSelector((state) => state.product.product);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      Pname: '',
      Pimg: null,
      Pcolor: '',
      Pprice: '',
      Pqut: '',
      description: '',
      category: '',
      subCatId: '',
    },

    onSubmit: (values) => {
      let newProduct = {
        product_ID: data.length + 1,
        subCatId: parseInt(values.subCatId),
        Pname: values.Pname,
        Pimg: values.Pimg ? values.Pimg.name : '',
        Pcolor: values.Pcolor,
        Pprice: values.Pprice,
        Pqut: values.Pqut,
        description: values.description,
        dateAdded: new Date().toISOString(),
      };
      console.log(newProduct);
    }
  });

  // Filter subcategories based on selected category
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.catId === parseInt(formik.values.category)
  );

  return (
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
            onChange={formik.handleChange}
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
              value={formik.values.subCatId || ''}
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

        <button type="submit" className="btn">Add Product</button>
      </form>
    </div>
  );
};

export default AdProduct;
