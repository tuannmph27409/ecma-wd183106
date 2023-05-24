import getData from "./product"



const tbody = document.querySelector("tbody")


 getData()
    .then((response) => response.json())
    .then((data) => {
      showProduct(data)

        const btnRemoves = document.querySelectorAll(".btn-xoa")
            console.log(btnRemoves);

        for(let btn of btnRemoves ){
            const id = btn.dataset.id
            btn.addEventListener("click", function(){
                return remove(id)
            })
        }

        const btnUpdates = document.querySelectorAll(".btn-update")

        for(let btn of btnUpdates){
            btn.addEventListener("click", function(){
                const id = btn.dataset.id
                return update(id)
            })
        }

    })

 const showProduct =  (data) =>{
     tbody.innerHTML = data.map((product,index) => {
         return /*html*/`
         <tr>
         <td> ${index + 1}</td>
         <td>${product.name} </td>
         <td>${product.price} </td>
         <td> 
            <button data-id="${product.id}" class="btn-xoa">DELETE</button>
            <button data-id="${product.id}" class="btn-update">UPDATE</button>
        </td>
     </tr>
         `

     }).join("")
 }

 const remove = (id) =>{
    const con = confirm("ban co chac ko ?")
    if(con){
        fetch(`http://localhost:3000/product/${id}`, {
            method:"DELETE"
        })
    }
 }

 
    const add = () => {
        document.querySelector("body").innerHTML= /*html*/`
        <form action="">
       
            <input type="text" id="productname" value="">
           
            <input type="number" id="productprice" value="">
            <button id="add_form">Add New</button>
        </form>
        `
        document.querySelector("#add_form").addEventListener("click", function(){
            const newProduct = {
                "name": document.querySelector("#productname").value,
                "price": document.querySelector("#productprice").value
            }
            fetch(`http://localhost:3000/product`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                    
                },
                body:JSON.stringify(newProduct)
            }).then(alert("ok"))
        })
    }
    document.querySelector("#add_product").addEventListener("click",add)

    const update = (id) =>{
        fetch(`http://localhost:3000/product/${id}`)
        .then((response) => response.json())
        .then((data) =>{
            document.querySelector("body").innerHTML= /*html*/`
            <form action="">
                    <input type="text" id="productname" value="${data.name}"/>
                    <input type="text" id="productprice" value="${data.price}"/>
                    <button id="btn-update">Update</button>
            </form>
            `
            document.querySelector("#btn-update").addEventListener("click", function(){
                const newProduct = {   
                    "name" : document.querySelector("#productname").value
                    ,"price" : document.querySelector("#productprice").value
                }
                fetch(`http://localhost:3000/product/${id}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(newProduct)
                }).then(alert("ok"))
            })
        }) 
    }

    
 