import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { SubcatgoryValidate } from './Schemas/ProductValidate';
import { AddSubCate } from '../../Redux-Toolkit/Admin_User/productSlice';

function ASCatForm() {
    // ____________________________________
  // Formik To addSubCaagory 
  // ____________________________________
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.category);
  // ____________________________________
  // Formik 
  // ____________________________________
  const initialValues = {
    category: '',
    name: '',
    description: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: SubcatgoryValidate,
    onSubmit: (values, action) => {
      let newSubCategory = {
        id: categories.length + 1, 
        catId: parseInt(values.category),
        name: values.name,
        description: values.description,
      };
      dispatch(AddSubCate(newSubCategory));
      console.log('SubCategory added:', newSubCategory);
      action.resetForm();
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select
          name="category"
          id="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && touched.category && <span className='error'>{errors.category}</span>}
      </div>

      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Subcategory Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && <span className='error'>{errors.name}</span>}
      </div>

      <div>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.description && touched.description && <span className='error'>{errors.description}</span>}
      </div>

      <button type="submit" className="btn add-cat-btn">Save</button>
    </form>
  );
}

export default ASCatForm;
