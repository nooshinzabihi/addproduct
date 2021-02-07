
    import { products} from "./function";
    import {removeProducts , saveProducts , changeProducts } from "./function";



    const titleElement = document.querySelector("#product-title");
    const priceElement = document.querySelector("#product-price");
    const removeElement = document.querySelector("#remove-product")
    const productId = location.hash.substring(1);

    let product = products.find(function(item){
        return item.id === productId
    });

    // if ( product = undefined){
    //     location.assign('/index.html')
    // }

    if(titleElement ,  priceElement){
        titleElement.value = product.title;
        priceElement.value = product.price;
    }

    titleElement && titleElement.addEventListener('input' , function(e){
        product.title = e.target.value;
        saveProducts(products);
    });

    priceElement && priceElement.addEventListener('input' , function(e){
        product.price = e.target.value;
        saveProducts(products);
    });

    removeElement && removeElement.addEventListener('click',function () {
        removeProducts(product.id);
        saveProducts(products);
        location.assign('./index.html');
    });

    window.addEventListener('storage',function(e){
        if(  e.key === 'products' ){
            changeProducts(JSON.parse(e.newValue))
            product = products.find(function(item){
                return item.id === productId
            });
            if(titleElement  ||  priceElement){
                titleElement.value = product.title;
                priceElement.value = product.price;
            }
        }
    });


