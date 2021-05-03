let prodcuctDOM=document.querySelector("#productDOM");
//getting Products
class Products{
   async  getProducts(){

    try{
        let result=await fetch('js/products.json');
        let data=await result.json();
        let products=data.items;
        products=products.map(item=>{
        const {title,price,count}=item.fields;
        const {id}=item.sys;
        const image=item.fields.image.fields.file.url;
        return {title,price,count,id,image};
        })
        return products;
    }catch(error){
        console.log(error)
    }


    }
}

//Display Products

class UI{
 
    displayProducts(products){
        let result ='';
        products.forEach(product => {
            
            result+=`
            <article>
            <div class="img-container">
                <img src="${product.image}" alt="">
            </div>
            <div class="img-text">
                <div class="img-head-text">
                    <h3>${product.title}</h3>
                    <b>${product.price}$</b>
                </div>
                    <p>Shoe</p>
                    <p>${product.count} in Stock</p>
            </div>

        </article>
            `;


        });
        prodcuctDOM.innerHTML=result;

    }
}

//localStorage
class Storage{
    static saveProducts(products)
    {
   localStorage.setItem("products",JSON.stringify(products));
    }

}

document.addEventListener("DOMContentLoaded",()=>{

const ui=new UI();
const products=new Products();
products.getProducts().then(data=>{
    
    ui.displayProducts(data);
    Storage.saveProducts(data)
})

})