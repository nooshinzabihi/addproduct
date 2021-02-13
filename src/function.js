
     import {filters} from "./index";
     import moment from "jalali-moment";

     let getSaveProducts = () => {
             const productsJSON = localStorage.getItem('products')
             try{
                 return productsJSON  !== null ?  JSON.parse(productsJSON) : [] ;
             }catch(e){
                 return [];
             }

    }

     export var  products = getSaveProducts();

     export function changeProducts (newproduct){
        products = newproduct
    }

     export const saveProducts = (products) => {
        localStorage.setItem('products' , JSON.stringify(products))
    }

     export const removeProducts = (id) =>{
        const productIndex = products.findIndex(item => item.id === id)
        return productIndex > -1 ? products.splice(productIndex,1) : '' ;
     }

     export const toggleProduct = function(id){
        const product = products.find(item => item.id === id)
        product != undefined ? product.exists  = !product.exists : '';
     }

      const sortProduct = function(products , sortBy){
         if(sortBy === 'byEdited'){
              return products.sort(( a , b)=>{
                    if(a.updated > b.updated){
                        return -1;
                    }else if( a.updated < a.updated){
                        return 1;
                   }else{
                        return  0;
                    }
              })
         }else if( sortBy === 'byCreated') {
              return products.sort((a , b) =>{
                  if(a.created > b.created){
                      return -1
                  }else if( a.created < b.created){
                      return 1;
                  }else{
                      return 0;
                  }
              })

         }else{
             return  products ;
         }
     }

     export const renderProducts = (products , filters) =>{

            sortProduct(products , filters.sortBy);
            let filterProducts = products.filter((item) => {
                 return  item.title.includes(filters.searchItem);
            });
            filterProducts = filterProducts.filter((item)=>{
                if(filters.availableProducts){
                    return item.exists
                }else{
                    return  true ;
                }
            });
            let productCont= document.querySelector('#products')
            if(productCont){ document.querySelector('#products').innerHTML=''}
            filterProducts.forEach(function(item){
                if(productCont){ document.querySelector('#products').appendChild(createProductDOM(item))}
        })
    }


     export const createProductDOM = (product) =>{
         const productEl = document.createElement('div')
         const checkbox = document.createElement('input')
         const productItem = document.createElement('a')
         const removeButton = document.createElement('button')

         checkbox.setAttribute('type' , 'checkbox')
         checkbox.checked = !products.exists
         productEl.appendChild(checkbox)
         checkbox.addEventListener('change'  , function(){
               toggleProduct(product.id);
               saveProducts(product)
               renderProducts(products , filters)
         })

         productItem.textContent = product.title
         productItem.setAttribute('href' , `./edit-product.html#${product.id}`)
         productEl.appendChild(productItem)

         removeButton.textContent = 'حذف'
         productEl.appendChild( removeButton)
         removeButton.addEventListener('click',function(){
             removeProducts(product.id)
             saveProducts(products)
             renderProducts(products , filters)
         })

         return productEl
    }


     export const lastEditMessage = (timestamp) =>{
         return `last Edit : ${ moment(timestamp).locale('fa').fromNow()}`
     }




