const express = require('express')
const res = require('express/lib/response')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));



const Product = require('./models/product')
const { redirect } = require('express/lib/response')
const { application } = require('express')

mongoose.connect('mongodb://127.0.0.1:27017/farm7', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));


app.listen(5000, ()=>{
    console.log("APP is listening on port 3000")
})

app.get("/api", async(req, res)=>{
    const products = await Product.find({})
const productsArr = products.map(p=>p.name)
    //console.log(products)
    res.json({"users": productsArr})
    //res.json({"users": [products[0].name,products[1].name,"userThree" ,"userFour"]})

    //res.json({"users": ["userOne","userTwo","userThree" ,"userFour"]})
})


app.get("/practice1", async(req, res)=>{
    const products = await Product.find({})
    console.log(products)
const productsArr = products.map(p=>p.name)
    res.json({"users": productsArr})
})

app.get("/practice2", async(req, res)=>{
    const products = await Product.find({})
    //console.log(products)
  // res.json({products})
// const productsArr = products.map(p=>p.name)
    res.json({"products": products})
})

app.get("/practice3", async(req, res)=>{
    const products = await Product.find({})
    //console.log(products)
  // res.json({products})
// const productsArr = products.map(p=>p.name)
    res.json({"products": products})
})


app.get("/practice4", async(req, res)=>{
    const products = await Product.find({})
    //console.log(products)
  // res.json({products})
// const productsArr = products.map(p=>p.name)
    res.json({"products": products})
})

app.get("/hello", (req, res)=>{

    res.json({"users": ["hellorOne","helloTwo","helloThree" ,"helloFour"]})
})

app.get("/products", async(req, res)=>{
    const products = await Product.find({})
   res.render("products/index", {products})
    // res.send({products})
})

app.post("/products", async(req, res)=>{
    const newProduct = new Product(req.body)
     await newProduct.save()
     res.redirect(`/products/${newProduct._id}`)

})
app.get("/products/new", (req, res)=>{
    res.render("products/create")
    // res.send("Create")
})

app.get("/products/:id", async(req, res)=>{
    const {id}=req.params
    const product = await Product.findById(id)
    // res.send("show")
    res.render("products/show", {product})
})

app.put("/products/:id", async(req, res)=>{
    const {id}=req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    res.redirect(`/products/${product._id}`)
})



app.get("/products/:id/edit", async(req, res)=>{
    const {id}=req.params
    const product = await Product.findById(id)
    // res.send("show")
    res.render("products/edit", {product})
})

app.delete("/products/:id", async(req, res)=>{
    const {id}=req.params
    const product = await Product.findByIdAndDelete(id)
    // res.send("show")
    res.redirect(`/products`)
})






// app.get("/products", async(req, res)=>{
//     const products = await Product.find({})
//     res.render("products/index", {products})
//     //res.send(`Products: ${products}`)
// })