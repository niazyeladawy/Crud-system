var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCatgory");
var productDesc = document.getElementById("productDesc");
var productContainer ;
var updateIndex = 0;
var updateBtn = document.querySelector("#updateBtn");
var addBtn = document.querySelector("#addBtn");
var notFound = document.querySelector("#notFound");
var productSearch = document.querySelector("#productSearch");


if(localStorage.getItem("productList")  == null){
    productContainer = [];
}
else{
    productContainer = JSON.parse(localStorage.getItem("productList")); 
    displayProduct();
}

function addProduct(){
    if(validateName() && validatePrice() && validateCategory() && validateDescription()){
        var product = {
            name:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            desc:productDesc.value,
        }
    
        productContainer.push(product);
        console.log(productContainer);
        localStorage.setItem("productList",JSON.stringify(productContainer));
        displayProduct();
        clearForm();
        clearValidClass();
    }
    else{
        alert("wrong input data");
    }

}

function clearForm (){
    productName.value="";
    productPrice.value="";
    productCategory.value ="";
    productDesc.value = "";
}

function displayProduct(){
    var cartona ="";
    

    for(var i =0 ; i< productContainer.length ; i++){
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td>
                <button class="btn btn-warning" onclick="updateProduct(${i})"> 
                    update
                </button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(${i})"> 
                    delete
                </button>
            </td>
        </tr>
        `
    }
    document.getElementById("tablebody").innerHTML = cartona;
}

// function validationInput(){
//     if(productName.value != "" && productPrice.value != "" && productCategory.value != "" && productDesc.value != "")
//     {
//         return true;
//     }
//     else{
//         return false;
//     }
// }

function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("productList",JSON.stringify(productContainer));
    displayProduct();
}

function searchProduct(term){
    var cartona ="";
    
    for(var i = 0 ; i < productContainer.length ; i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase()) || 
        
        productContainer[i].category.toLowerCase().includes(term.toLowerCase())){
            cartona += `
            <tr>
                <td>${i}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].desc}</td>
                <td>
                    <button class="btn btn-warning"  onclick="updateProduct(${i})"> 
                        update
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})"> 
                        delete
                    </button>
                </td>
            </tr>
            `
        }
        
        
        
    }
    document.getElementById("tablebody").innerHTML = cartona;
    if(cartona.length==0){
        console.log(productSearch.value);
        notFound.style.display = "block";
        notFound.innerHTML=`
        0 Results found for ${productSearch.value}
        `
    }
    else{
        notFound.style.display = "none";
    }
}

function updateProduct(index){
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDesc.value = productContainer[index].desc;
    updateBtn.style.display = "block";
    addBtn.style.display = "none";
    updateIndex = index;
}

function editProduct(){
    if(validateName() && validatePrice() && validateCategory() && validateDescription()){
        productContainer[updateIndex].name = productName.value;
        productContainer[updateIndex].price = productPrice.value;
        productContainer[updateIndex].category = productCategory.value;
        productContainer[updateIndex].desc = productDesc.value;
        updateBtn.style.display = "none";
        addBtn.style.display = "block";
        localStorage.setItem("productList",JSON.stringify(productContainer));
        displayProduct();
        clearForm();
        clearValidClass();
    }
    else{
        alert("wrong input data");
    }
    
}

productName.addEventListener("focusout",validateName);
function validateName(){
    var regex = /^[a-zA-z]{2,15}[0-9]*$/;
    if(regex.test(productName.value)){
        console.log("yes");
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        return true;
    }
    else{
        productName.classList.add("is-invalid");
        console.log("no");
        return false;
    }
}

productPrice.addEventListener("focusout",validatePrice);
function validatePrice(){
    var regex = /^[1-9]\d{1,4}(?:\.\d{1,4})?$/;
    if(regex.test(productPrice.value)){
        console.log("yes");
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        return true;
    }
    else{
        productPrice.classList.add("is-invalid");
        console.log("no");
        return false;
    }
}

productCategory.addEventListener("focusout",validateCategory);
function validateCategory(){
    var regex = /^[a-zA-z]{1,9}$/;
    if(regex.test(productCategory.value)){
        console.log("yes");
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        return true;
    }
    else{
        productCategory.classList.add("is-invalid");
        console.log("no");
        return false;
    }
}

productDesc.addEventListener("focusout",validateDescription);
function validateDescription(){
    var regex = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
    if(regex.test(productDesc.value)){
        console.log("yes");
        productDesc.classList.add("is-valid");
        productDesc.classList.remove("is-invalid");
        return true;
    }
    else{
        productDesc.classList.add("is-invalid");
        console.log("no");
        return false;
    }
}

function clearValidClass(){
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
    productDesc.classList.remove("is-valid");
}