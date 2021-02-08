
    import { products} from "./function";
    import moment from 'jalali-moment'
    import {removeProducts , saveProducts , changeProducts  , lastEditMessage} from "./function";



    const titleElement = document.querySelector("#product-title");
    const priceElement = document.querySelector("#product-price");
    const removeElement = document.querySelector("#remove-product");
    const dateElement = document.querySelector('#last-edit');
    const productId = location.hash.substring(1);

    let product = products.find(item =>  item.id === productId);


    if(titleElement ,  priceElement){
        titleElement.value = product.title;
        priceElement.value = product.price;
        dateElement.textContent = lastEditMessage(product.updated)
    }

    titleElement && titleElement.addEventListener('input' , (e) =>{
        product.title = e.target.value;
        product.updated = moment().valueOf();
        dateElement.textContent = lastEditMessage(product.updated)
        saveProducts(products);
    });

    priceElement && priceElement.addEventListener('input' , (e) =>{
        product.price = e.target.value;
        product.updated = moment().valueOf();
        dateElement.textContent = lastEditMessage(product.updated)
        saveProducts(products);
    });

    removeElement && removeElement.addEventListener('click', () =>{
        removeProducts(product.id);
        saveProducts(products);
        location.assign('./index.html');
    });

    window.addEventListener('storage',(e) =>{
        if(  e.key === 'products' ){
            changeProducts(JSON.parse(e.newValue))
            product = products.find(item => item.id === productId);
            if(titleElement  ||  priceElement){
                titleElement.value = product.title;
                priceElement.value = product.price;
                dateElement.textContent = lastEditMessage(product.updated)
            }
        }
    });


