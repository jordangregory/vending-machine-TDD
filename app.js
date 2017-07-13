//TODO List of items, number, price.
const inventory = require("./data/vendingInventory");
const purchases = require("./data/vendingPurchases");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/api/customer/items", (req, res) => {
  res.send(inventory);
});

app.post("/api/customer/items/:itemId/purchases", (req, res) => {
  var itemId = req.params.itemId; //1
  var item = inventory.items.find(e => {
    return e.id == itemId;
  });

  var change = req.body.moneySent - item.cost;
  item.quantity -= 1;

  return res.send({
    status: "success",
    data: { change: change, purchase: item }
  });
});

app.get("/api/vendor/purchases", (req, res) => {
  res.send(purchases);
});

app.get("/api/vendor/money", (req, res) => {
  var totalPurchasedValue = 0;

  for (i = 0; i < purchases.purchases.length; i++) {
    totalPurchasedValue = totalPurchasedValue + purchases.purchases[i].cost;
  }
  res.send({ cost: totalPurchasedValue });
});

app.post("/api/vendor/items", (req, res)=>{
   
   var currentItemInventory = inventory.items;
   var newInventory = [];

   currentItemInventory.push(
       {id: req.body.id, 
       item: req.body.item, 
       cost: req.body.cost, 
       quantity: req.body.quantity}
       );

   return res.send({status: "success", data: currentItemInventory});
   
})

app.put("/api/vendor/items/:itemId", (req, res)=>{
   
 currentItemInventory = inventory.items;

 var itemToUpdate = currentItemInventory.find(e => {
    return e.id == req.params.itemId;
  });

var location = currentItemInventory.indexOf(itemToUpdate);
console.log(location);

  currentItemInventory[location] = {
      id : req.params.itemId,      
    item: req.body.item,
    cost: req.body.cost,
    quantity: req.body.quantity
  };



   return res.send({status: "success", data: currentItemInventory});
   
})

app.listen(3000);

module.exports = app;
