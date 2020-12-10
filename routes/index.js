const express = require("express");
const { _router } = require("../app");
const router = new express.Router();

const SneakerModel = require("./../models/Sneaker")

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", async (req, res, next) => {
  const sneakers =  await SneakerModel.find();
  res.render("products", { sneakers });
});


router.get("/sneakers/:cat", async (req, res, next) => {
  try {
  const sneakers = await SneakerModel.find({ category: req.params.cat });
  res.render("products", {sneakers});
  } catch(err) {
    next(err)
  }
});

router.get("/one-product/:id",async (req, res, next) => {
try {
  const sneaker = await SneakerModel.findById(req.params.id);
  console.log(sneaker)
  res.render("one_product", {sneaker});
} catch(err) {
  next(err)
}
});

//NEW ROUTE TO ACCESS CREATE FORM
router.get("/product-add", (req, res) => {
  res.render("products_add")
})

router.post("/product-add", async (req, res) => {
  try {
const {image, name, ref} = req.body

const newSneaker = {image, name, ref}
console.log(newSneaker)
const createdSneaker = await SneakerModel.create(newSneaker);
res.redirect("/sneakers/collection")
  } catch (err) {
    next(err)
  }
})




router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
