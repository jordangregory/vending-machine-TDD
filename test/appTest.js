const app = require("../app");

const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const request = require("supertest");
chai.should();

describe("GET /api/customer/items", function() {
  it("should list items costs and quantities", function(done) {
    request(app)
      .get("/api/customer/items")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body.items[0].id, 1);
        assert.equal(res.body.items[0].item, "cookies");
        assert.equal(res.body.items[0].cost, 65);
        assert.equal(res.body.items[0].quantity, 5);
      })
      .end(done);
  });
});

describe("POST /api/customer/items/:itemId/purchases", function() {
  it("should allow customer to purchase item using money", function(done) {
    request(app)
      .post("/api/customer/items/1/purchases")
      .send({ moneySent: 100 })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body.status, "success");
        assert.equal(res.body.data.change, 35);
        assert.equal(res.body.data.purchase.id, 1);
        assert.equal(res.body.data.purchase.item, "cookies");
        assert.equal(res.body.data.purchase.cost, 65);
        assert.equal(res.body.data.purchase.quantity, 4);
      })
      .end(done);
  });
});

describe("GET /api/vendor/purchases", function() {
  it("should list all purchases with date/time", function(done) {
    request(app)
      .get("/api/vendor/purchases")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body.purchases[0].id, 1);
      })
      .end(done);
  });
});

describe("GET /api/vendor/money", function() {
  it("should list all purchases with date/time", function(done) {
    request(app)
      .get("/api/vendor/money")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body.cost, 120);
      })
      .end(done);
  });
});

describe("POST /api/vendor/items", function() {
  it("should allow vendor to add new items", function(done) {
    request(app)
      .post("/api/vendor/items")
      .send(
          {
    id : 4,
    item: "awesome",
    cost: 95,
    quantity: 57
  }
      )
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body.status, "success");
        assert.equal(res.body.data[3].id, 4);
        assert.equal(res.body.data[3].item, "awesome");
      })
      .end(done);
  });
});

describe("PUT /api/vendor/items/:itemId", function(){
    it("should allow vendor to update an existing item", function(done){
        request(app)
        .put("/api/vendor/items/1")
        .send({
            item: "brownies",
            cost: 70,
            quantity: 8
        })
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            assert.equal(res.body.status, "success");
            assert.equal(res.body.data[0].item, "brownies");


        })
        .end(done);
    })
})
