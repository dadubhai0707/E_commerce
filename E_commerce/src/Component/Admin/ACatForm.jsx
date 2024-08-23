import { useSelector,useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { catgoryValidate } from './Schemas/ProductValidate';
import { AddCate } from '../../Redux-Toolkit/Admin_User/productSlice';


function ACatForm() {
  // ____________________________________
  // Redux-variable
  // ____________________________________
  const dispatch = useDispatch();
  let data=useSelector((state)=>state.product.category)
  // ____________________________________
  // Formik To addcatagroy 
  // ____________________________________

  const initialValues = {
    Cname: '',
    Description: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: catgoryValidate,
    onSubmit: (value, action) => {
      let newCategory = {
        id: data.length+1 , // Generating a simple ID for the new category
        name: value.Cname,
        description: value.Description,
      };
      dispatch(AddCate(newCategory));
      console.log('Category added:', newCategory);
      action.resetForm();
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="Cname"
          placeholder="Enter Category Name"
          name="Cname"
          value={values.Cname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.Cname && touched.Cname && <span className='error'>{errors.Cname}</span>}
      </div>
      <div>
        <input
          type="text"
          id="Description"
          placeholder="Description"
          name="Description"
          value={values.Description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.Description && touched.Description && <span className='error'>{errors.Description}</span>}
      </div>
      <button type='submit' onSubmit={handleSubmit} className="btn add-cat-btn">Save Cat</button>
    </form>
  );
}

export default ACatForm;
