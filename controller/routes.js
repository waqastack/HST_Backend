const express = require("express");
const router = express.Router();
const upload = require("../middleware/Imageupload");
const {
  singin,
  signup,
  getData,
  deleteUser,
  udpateUser,
  findSingleUser,
  addProduct,
  getProduct,
  saveSlip,
  deleteProduct,
  findSingleProduct,
  udpateProduct,
  AdminSignIn,
  signupAdmin,
  getallcartSinglelimited,
  addServices,
  deleteServiceData,
  findSingleService,
  getserviceData,
  updateServiceData,
  addtocart,
  getallcartSingle,
  findSingleProductforadd,
  cartSingleRemove,
  cartqtyUpdate,
  updatePrice,
  findSingleCartProduct,
  makePayment,
  orders,
  userdataDetails,
  aftersalesemptycart,
  savePriceCalcRecord,
  getDataCalc,
  getAllTheProduct,
  allOrders,
  update3d,
  imageCrud,
  showAllIamges,
  deleteImage,
  updateImage,
} = require("./userLogics");
// routes for user account
router.post("/signup", signup);
router.post("/signin", singin);
router.get("/getData", getData);
router.delete("/deleteUser/:id", deleteUser);
router.put("/udpateUser/:id", udpateUser);
router.get("/findSingleUser/:id", findSingleUser);
// routes for the productPanel
router.post("/addProduct", addProduct);
router.post("/getProduct", getProduct);
router.get("/getAllTheProduct", getAllTheProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/findSingleProduct/:id", findSingleProduct);
router.put("/udpateProduct/:id", udpateProduct);
// routes for admin account
router.post("/signupadmin", signupAdmin);
router.post("/signinadmin", AdminSignIn);
// routes for the admin services
router.post("/addservice", addServices);
router.get("/getServices", getserviceData);
router.delete("/deleteservice/:id", deleteServiceData);
router.get("/findSingleservice/:id", findSingleService);
router.put("/udpateservice/:id", updateServiceData);
// routes for the addtocart user
router.post("/findSingleProductforadd/:id", findSingleProductforadd);
router.post("/addtocartSingle", addtocart);
router.get("/getallcartSingle/:email", getallcartSingle);
router.get("/getProductlimited", getallcartSinglelimited);
router.post("/cartSingleRemove/:id", cartSingleRemove);
router.put("/cartqtyUpdate/:id", cartqtyUpdate);
router.post("/findSingleCartProduct/:_id", findSingleCartProduct);
// payment method
router.post("/payment", makePayment);
// adding after sales record for customer
router.post("/userdataDetails", userdataDetails);

// getting orders details
router.get("/orders/:email", orders);
// aftersalesemptycart
// note:we have to use the put method to delete a record as put method
// is used for update a record but in fact we are updating our record
// on basis of removed record
router.put("/aftersalesemptycart/:email", aftersalesemptycart);
// save price calculator record
router.post("/savePriceCalcRecord", savePriceCalcRecord);
// get data for the price calculator
router.get("/getDataCalc", getDataCalc);
//udpate the record
router.put("/updatePrice", updatePrice);
//user slip
router.post("/saveSlip/:email", saveSlip);
//all orders to show admin
router.get("/allOrders", allOrders);
// update3d image
router.post("/update3d/:id", update3d);
//image crud
router.post("/imageCrud", upload.single("image"), imageCrud);
// show images
router.get("/showAllIamges", showAllIamges);
// deleteImage
router.delete("/deleteImage/:imgId", deleteImage);
// updateImage
router.patch("/updateImage/:imgId", upload.single("image"), updateImage);

module.exports = router;
