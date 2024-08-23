import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    category: [
        { id: 1, name: "Electronic", description: "All Electronic" },
        { id: 2, name: "Furniture", description: "All Furniture" },
        { id: 3, name: "Clothing", description: "All Clothing" },
        { id: 4, name: "Books", description: "All Books" },
        { id: 5, name: "Toys", description: "All Toys" },
        { id: 6, name: "Groceries", description: "All Groceries" },
        { id: 7, name: "Tools", description: "All Tools" },
        { id: 8, name: "Appliances", description: "All Appliances" },
        { id: 9, name: "Sports", description: "All Sports" },
        { id: 10, name: "Music", description: "All Music" },
    ],
    subcategory: [
        { id: 1, catId: 1, name: "Mobile Phones", description: "All Mobile Phones" },
        { id: 2, catId: 2, name: "Sofas", description: "All Sofas" },
        { id: 3, catId: 2, name: "Doars", description: "All Sofas" },
        { id: 4, catId: 3, name: "Men's Clothing", description: "All Men's Clothing" },
        { id: 5, catId: 3, name: "Femail's Clothing", description: "All Men's Clothing" },
        { id: 6, catId: 4, name: "Fiction Books", description: "All Fiction Books" },
        { id: 7, catId: 4, name: "Story Books", description: "All Fiction Books" },
        { id: 8, catId: 5, name: "Educational Toys", description: "All Educational Toys" },
        { id: 9, catId: 5, name: "Robot's", description: "All Educational Toys" },
        { id: 10, catId: 6, name: "Organic Groceries", description: "All Organic Groceries" },
        { id: 11, catId: 7, name: "Power Tools", description: "All Power Tools" },
        { id: 12, catId: 8, name: "Kitchen Appliances", description: "All Kitchen Appliances" },
        { id: 13, catId: 9, name: "Fitness Equipment", description: "All Fitness Equipment" },
        { id: 14, catId: 10, name: "Musical Instruments", description: "All Musical Instruments" },
    ],
    product: [
        { product_ID: 1, subCatId: 1, description: 'This IS Best Product Of An World How You Use', Pname: 'Voltas 2023 Model 0.6 Ton 2 Star Split AC', Pimg: 'color.jpg', Pcolor: 'White', Pprice: 25000, Pqut: 20, dateAdded: '2024-01-07T12:00:00Z' },
        { product_ID: 2, subCatId: 2, description: 'This IS Best Product Of An World How You Use', Pname: 'Leather Sofa Set', Pimg: 'SofaSet.jpg', Pcolor: 'Brown', Pprice: 45000, Pqut: 15, dateAdded: '2024-01-07T12:00:00Z' },
        { product_ID: 3, subCatId: 4, description: 'This IS Best Product Of An World How You Use', Pname: 'Men’s Casual Shirt', Pimg: 'Men’s Casual Shirt.jpg', Pcolor: 'Blue', Pprice: 1500, Pqut: 30, dateAdded: '2024-02-07T12:00:00Z' },
        { product_ID: 4, subCatId: 6, description: 'This IS Best Product Of An World How You Use', Pname: 'The Great Gatsby', Pimg: 'The Great Gatsby.jpg', Pcolor: 'N/A', Pprice: 500, Pqut: 40, dateAdded: '2024-02-07T12:00:00Z' },
        { product_ID: 5, subCatId: 8, description: 'This IS Best Product Of An World How You Use', Pname: 'Building Blocks Toy', Pimg: 'Building Blocks Toy.jpg', Pcolor: 'Multi-color', Pprice: 1200, Pqut: 25, dateAdded: '2024-03-07T12:00:00Z' },
        { product_ID: 6, subCatId: 10, description: 'This IS Best Product Of An World How You Use', Pname: 'Organic Apples', Pimg: 'Organic Apples.jpg', Pcolor: 'Red', Pprice: 300, Pqut: 50, dateAdded: '2024-04-07T12:00:00Z' },
        { product_ID: 7, subCatId:11, description: 'This IS Best Product Of An World How You Use', Pname: 'Cordless Drill', Pimg: 'Cordless Drill.jpg', Pcolor: 'Black', Pprice: 8000, Pqut: 10, dateAdded: '2024-05-07T12:00:00Z' },
        { product_ID: 8, subCatId: 11, description: 'This IS Best Product Of An World How You Use', Pname: 'Blender', Pimg: 'Blender.jpg', Pcolor: 'Silver', Pprice: 3500, Pqut: 20, dateAdded: '2024-06-07T12:00:00Z' },
        { product_ID: 9, subCatId: 13, description: 'This IS Best Product Of An World How You Use', Pname: 'Yoga Mat', Pimg: 'Yoga Mat.jpg', Pcolor: 'Green', Pprice: 800, Pqut: 35, dateAdded: '2024-07-07T12:00:00Z' },
        { product_ID: 10, subCatId: 14, description: 'This IS Best Product Of An World How You Use', Pname: 'Electric Guitar', Pimg: 'Electric Guitar.jpg', Pcolor: 'Black', Pprice: 15000, Pqut: 12, dateAdded: '2024-08-07T12:00:00Z' },
    ],

    selectedCategory: null,
    searchWhithDropDown: null,
    searchWhithInput: null,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // _____________________________
        // Category Reducers
        // _____________________________
        AddCate: (state, action) => {
            state.category.push(action.payload);
        },
        // _____________________________
        // SubCategory Reducers
        // _____________________________
        AddSubCate: (state, action) => {
            state.subcategory.push(action.payload);
        },
        // _____________________________
        // Product Reducers
        // _____________________________
        AddProduct: (state, action) => {
            state.product.push(action.payload);
        },

        // _____________________________
        // Select Catagroy Reducers
        // _____________________________

        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        // _____________________________
        // Drop Down
        // _____________________________
        DropDownFilter: (state, action) => {
            state.searchWhithDropDown = action.payload;
        },
        // _____________________________
        // Filter Bay Input
        // _____________________________
        filterBysearch: (state, action) => {
            state.searchWhithInput = action.payload
        },
        updateProductQuantity: (state, action) => {
            const { productId, quntity } = action.payload;
            const product = state.product.find(p => p.product_ID === productId);
            if (product) {
                product.Pqut -= quntity; // Decrease the quantity
                if (product.Pqut < 0) product.Pqut = 0; // Ensure quantity doesn't go below 0
            }
        },

        // ______________________________________________________
        // ______________________________________________________
        //   Edit / Delete Product,catagroy And  subCataroy
        // ______________________________________________________
        // ______________________________________________________

        // ___________________________
        // Delete Catagroy 
        // ___________________________
        deleteCategory: (state, action) => {
            const categoryId = action.payload;
            state.category = state.category.filter(cat => cat.id !== categoryId);
            state.subcategory = state.subcategory.filter(subcat => subcat.catId !== categoryId);
            state.product = state.product.filter(product => {
                const subCat = state.subcategory.find(subcat => subcat.id === product.subCatId);
                return subCat && subCat.catId !== categoryId;
            });
        },
        // ___________________________
        // Delete SubCatagroy
        // ___________________________
        deleteSubCat: (state, action) => {
            const SubcatId = action.payload;
            state.subcategory = state.subcategory.filter(subcat => subcat.id !== SubcatId);
        },
        // ___________________________
        // Edit  Product
        // ___________________________  
        editProduct: (state, action) => {
            const index = state.product.findIndex(product => product.product_ID === action.payload.product_ID);
            if (index !== -1) {
                state.product[index] = { ...action.payload };
                console.log(state.product[index])
            }
        },
        deleteProduct: (state, action) => {
            const productId = action.payload;
            state.product = state.product.filter(product => product.product_ID !== productId);
        },
        
    },
});
export const { AddCate, AddSubCate, AddProduct, setSelectedCategory, DropDownFilter, deleteCategory, filterBysearch, updateProductQuantity, deleteSubCat,editProduct,deleteProduct } = productSlice.actions;
export default productSlice.reducer;
