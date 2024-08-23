import { useState } from "react";
import Aheader from "../../Component/Common/Aheader";
import { useDispatch, useSelector } from 'react-redux';
import ASCatForm from "../../Component/Admin/ASCatform";
import {deleteSubCat} from "../../Redux-Toolkit/Admin_User/productSlice"
function SubCategory() {
 const dispatch=useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const subcategory = useSelector((state) => state.product.subcategory);
  const category = useSelector((state) => state.product.category);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = subcategory.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(subcategory.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Function to get the category name by id
  const getCategoryNameById = (catId) => {
    const cat = category.find(cat => cat.id === catId);
    return cat ? cat.name : "Unknown";
  };

  // 
let deleteSubcate=(id)=>{
  dispatch(deleteSubCat(id))
}
  return (
    <>
      <div className="header">
        <Aheader name={"SubCategory"} />
      </div>
      <div className="Add-form">
        <ASCatForm />
      </div>
      <div className="cat-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category Name</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{getCategoryNameById(row.catId)}</td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>
                  <button className="btn deshbord-header-btn" onClick={()=>deleteSubcate(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default SubCategory;
