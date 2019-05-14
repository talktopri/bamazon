var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  displayAll();
  purchase();
});

//function to show all items available for sale

function displayAll() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }


function purchase() {
  inquirer
    .prompt({
      name: "productID",
      type: "number",
      message: "Please enter the ID for the product you would like to buy:",
      default: "You must enter a product ID"
      
    })
    .then(function(answer) {
        var query = 
            "SELECT * FROM `products` WHERE `item_id` = ?",
            answer
            console.log(query);
            

        if (query < answer) {
            console.log("Insufficient quantity!");
            connection.end();
        } else {
            inquirer
                .prompt({
                name: "productAmount",
                type: "number",
                message: "How many units would you like to buy?",
                default: "You must enter an amount greater than 0."
            })
            .then(updateDB());

        }
    });
}

function updateDB() {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: 100
          },
          {
            flavor: "Rocky Road"
          }
        ],
        function(err, res) {
          console.log(res.affectedRows + " products updated!\n");
          // Call deleteProduct AFTER the UPDATE completes
          deleteProduct();
        }
      );
    
      // logs the actual query being run
      console.log(query.sql);
    }