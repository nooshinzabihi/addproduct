
     import {filters} from "./index";

     let getSaveProducts = function() {

            const productsJSON = localStorage.getItem('products')
                if( productsJSON  !== null){
                    return  JSON.parse(productsJSON);
                }else{
                    return [];
                }
    }
     export var  products = getSaveProducts();

     export function changeProducts (newproduct){
        products = newproduct
    }

     export const saveProducts = function (products) {
        localStorage.setItem('products' , JSON.stringify(products))
    }

     export const removeProducts = function(id){
        const productIndex = products.findIndex(function(item){
            return item.id === id
        })
        if(productIndex > -1){
            products.splice(productIndex,1)
        }
    }

     export const toggleProduct = function(id){
        const product = products.find(function(item){
            return item.id === id
        })
        if(product != undefined){
            product.exists  = !product.exists
        }
     }

     export const renderProducts = function(products , filters){
            let filterProducts = products.filter(function(item){
                 return  item.title.includes(filters.searchItem);
            });
            filterProducts = filterProducts.filter(function(item){
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


     export const createProductDOM = function(product){
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

         removeButton.textContent = 'Remove'
         productEl.appendChild( removeButton)
         removeButton.addEventListener('click',function(){
             removeProducts(product.id)
             saveProducts(products)
             renderProducts(products , filters)
         })

         return productEl
    }




