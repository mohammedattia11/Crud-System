
let productNameInput = document.querySelector('#productName')
let productPriceInput = document.querySelector('#productPrice')
let productCategoryInput = document.querySelector('#categroty')
let addBtn = document.querySelector('#addBtn')
let updateBtn = document.querySelector('#updateBtn')
let currentIndex = 0;
let productList = []
if (localStorage.getItem('list')!=null) {
    productList = JSON.parse(localStorage.getItem('list'))
    displayProducts(productList)

}
function addProduct() {
    let product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value
    }
    productList.push(product)
    localStorage.setItem('list', JSON.stringify(productList))
    displayProducts(productList)
    resetInputs()
}
function displayProducts(arr) {
    let container = ''
    for (let i = 0; i < arr.length; i++) {
        container+=`<tr>
        <th scope="row">${i+1}</th>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td><button onclick="updateProductForm(${i})" class="btn btn-warning text-white p-1">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger p-1">Delete</button></td>
      </tr>`
    }
    document.querySelector('#tableBody').innerHTML=container
}
function clearInputs() {
    productList = []
    displayProducts(productList)
    localStorage.setItem('list', JSON.stringify(productList))

}
function resetInputs() {
    productNameInput.value=''
    productPriceInput.value=''

}
function deleteProduct(productInddex) {
    productList.splice(productInddex,1)
    displayProducts(productList)
    localStorage.setItem('list', JSON.stringify(productList))
}
function searchProducts(term) {
    let matchedProducts= []
    for (let i = 0; i < productList.length; i++) {
        if(productList[i].name.toLowerCase().includes(term)==true) {
            matchedProducts.push(productList[i])
        }
    }
    displayProducts(matchedProducts)
}
function updateProductForm(i) {
    currentIndex=i
    addBtn.classList.replace('d-block','d-none')
    updateBtn.classList.replace('d-none','d-block')
    productNameInput.value = productList[i].name;
    productPriceInput.value = productList[i].price;
    productCategoryInput.value = productList[i].category;
}
function updateProduct() {
    productList[currentIndex].name = productNameInput.value
    productList[currentIndex].price = productPriceInput.value
    productList[currentIndex].category = productCategoryInput.value
    localStorage.setItem('list', JSON.stringify(productList))
    displayProducts(productList)
    resetInputs()
}