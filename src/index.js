
   import * as func  from './function'
   import { v4 as uuidv4 } from 'uuid';
   import {products} from "./function";
   import {changeProducts} from "./function";
   import  moment from 'moment';

   export let filters = {
        searchItem: '',
        availableProducts : false
    };

   func.renderProducts(products , filters);

   document.querySelector('#search-products') &&
   document.querySelector('#search-products').addEventListener('input' ,function(e){
       filters.searchItem = e.target.value;
       func.renderProducts(products , filters);
    });

   document.querySelector('#add-product-form') &&
   document.querySelector('#add-product-form').addEventListener('submit' ,function(e){

            e.preventDefault();
            const id = uuidv4();
            products.push({
                id: id ,
                price : e.target.elements.productPrice.value,
                title : e.target.elements.productTitle.value,
                exists : true
            });
             func.saveProducts(products);
             func.renderProducts( products , filters );
             e.target.elements.productTitle.value =''
    });


   document.querySelector('#available-products') &&
   document.querySelector('#available-products').addEventListener('change' , function(e){
        filters.availableProducts = e.target.checked ;
        func.renderProducts(products , filters);
    });


   // document.querySelector('#sort') &&
   // document.querySelector('#sort').addEventListener('change',function(e){
   //      console.log(e.target.valueof())
   //  });


   window.addEventListener('storage',function(e){
       if(  e.key === 'products' ){
           changeProducts(JSON.parse(e.newValue));
           func.renderProducts(products , filters );
       }
   });

