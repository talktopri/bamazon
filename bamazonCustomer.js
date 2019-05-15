var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// // connect to the mysql server and sql database
// connection.connect(function(err) {
//   if (err) throw err;
//   // run the start function after the connection is made to prompt the user
//   start();
  
// });

function start(){
    //prints the items for sale and their details
    connection.query('SELECT * FROM Products', function(err, res){
      if(err) throw err;
    
      console.log('_.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._')
      console.log('----------------------------------------------------------------------------------------------------')
    
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------')
      }
    
      console.log(' ');
      inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "What is the ID of the product you would like to purchase?",
          validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
              return true;
            } else{
              return false;
            }
          }
        },
        {
          type: "input",
          name: "qty",
          message: "How much would you like to purchase?",
          validate: function(value){
            if(isNaN(value)){
              return false;
            } else{
              return true;
            }
          }
        }
        ]).then(function(ans){
          var whatToBuy = (ans.id)-1;
          var howMuchToBuy = parseInt(ans.qty);
          var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));
    
          //check if quantity is sufficient
          if(res[whatToBuy].stock_quantity >= howMuchToBuy){
            //after purchase, updates quantity in Products
            connection.query("UPDATE Products SET ? WHERE ?", [
            {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
            {item_id: ans.id}
            ], function(err, result){
                if(err) throw err;
                console.log("Success! Your total is $" + grandTotal.toFixed(2));
            });
    
          } else{
            console.log("Sorry, there's not enough in stock!");
          }
    
        })
    })
    }
 
    start();

// function purchase() {
//     inquirer
//       .prompt([
//       {
//         name: "productID",
//         type: "number",
//         message: "Please enter the ID for the product you would like to buy:",
//         default: "You must enter a product ID"
//       },
//       {
//           name: "productAmount",
//           type: "number",
//           message: "How many units would you like to buy?",
//           default: "You must enter an amount greater than 0."
//       }  
//       ])
//       .then(function(answer) {
//           var whatToBuy = (answer.productID)-1;
//           var howMuchToBuy = parseInt(answer.productAmount);
//           var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));
  
//         //check quantity
//         if(res[whatToBuy].stock_quantity >= howMuchToBuy){
//           //after purchase, updates quantity in Products
//           connection.query("UPDATE Products SET ? WHERE ?", [
//           {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
//           {item_id: answer.productID}
//           ], function(err, result){
//               if(err) throw err;
//               console.log("Success! Your total is $" + grandTotal.toFixed(2));
//           });
  
  
//         } else {
//           console.log("Sorry, there's not enough in stock!");
//         }
  
      
//       });
      
//   }
// //function to show all items available for sale

// function displayAll() {
//     connection.query("SELECT * FROM products", function(err, res) {
//         if (err) throw err;
//         for(var i = 0; i < res.length; i++) {
//         console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
//         }
// purchase(res);
// })
// }