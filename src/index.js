
   import * as func  from './function'
   import { v4 as uuidv4 } from 'uuid';
   import {products} from "./function";
   import {changeProducts} from "./function";
   import moment from 'jalali-moment'


   export let filters = {
        searchItem: '',
        availableProducts : false,
        sortBy : 'byEdited'
    };

   func.renderProducts(products , filters);

   document.querySelector('#search-products') &&
   document.querySelector('#search-products').addEventListener('input' ,(e) =>{
       filters.searchItem = e.target.value;
       func.renderProducts(products , filters);
    });

   document.querySelector('#add-product-form') &&
   document.querySelector('#add-product-form').addEventListener('submit' ,(e) =>{
            e.preventDefault();
            const id = uuidv4();
            const timestamp = moment().valueOf()
            products.push({
                id: id ,
                price : e.target.elements.productPrice.value,
                title : e.target.elements.productTitle.value,
                exists : true,
                created : timestamp ,
                updated :timestamp
            });
             func.saveProducts(products);
             func.renderProducts( products , filters );
             e.target.elements.productTitle.value =''
    });


   document.querySelector('#available-products') &&
   document.querySelector('#available-products').addEventListener('change' , (e) =>{
        filters.availableProducts = e.target.checked ;
        func.renderProducts(products , filters);
    });


   document.querySelector('#sort') &&
   document.querySelector('#sort').addEventListener('change',(e) =>{
        filters.sortBy = e.target.value;
       func.renderProducts(products , filters);
    });


   window.addEventListener('storage', (e) =>{
       if(  e.key === 'products' ){
           changeProducts(JSON.parse(e.newValue));
           func.renderProducts(products , filters );
       }
   });


