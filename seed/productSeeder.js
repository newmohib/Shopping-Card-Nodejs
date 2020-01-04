var mongoose = require('mongoose');
var Product = require('../models/product')

mongoose.connect('mongodb://localhost/shopping')
.then(() =>  console.log('connection succesful for Seeder'))
.catch((err) => console.error('connection not succesful for Seeder',err));

var products = [

    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awesome Game!!",
        price: 10,

    }),
    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awesome Game!!",
        price: 10,

    }),
    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awesome Game!!",
        price: 10,

    })
]


// var products = new Product({
//         imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
//         title: "Gothic Video Game",
//         description: "Awesome Game!!",
//         price: 10,

//     })

var done =0;

for (let i = 0; i < products.length; i++) {
    products[i].save((err,result)=>{
        console.log("result",result);
        done++;
        if (done === products.length) {
            exit();
        }
    })

}

function exit(){
    console.log("database disconnect");
    mongoose.disconnect();
}