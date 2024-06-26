const {
  usersignup,
  Product,
  AdminData,
  ServiceData,
  cartadd,
  custmOrders,
  priceCalculator,
  slip,
  ImgModel,
} = require("../Model/userSchema");
const async = require("async");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51IsiGeERaO9lvsvDadobGmPv6X817aNWoxTLY1w72DPPcZMi1Ihf2mMTThB0VNP1ZaGpF0dL33GA3eNOE16zLBkb00CtlKMuR9"
);
const signup = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    if (data.password === data.cpassword) {
      const dataCheck = new usersignup(data);
      await dataCheck.save();
      res.json({ email: dataCheck.email, userData: dataCheck });
    } else {
      res.json({ passerr: "passerr" });
    }
  } catch (error) {
    console.log(`error during signup ${error}`);
    console.log(error);
    res.json(error);
  }
};

//sign in data
const singin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExists = await usersignup.findOne({ email, password });
    // console.log(isExists);
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({
        success: "success",
        user: isExists.email,
        fulldata: isExists,
      });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
// get all data
const getData = async (req, res) => {
  try {
    const data = await usersignup.find();
    res.json({ data });
  } catch (error) {
    console.log(`error during the getall data`);
  }
};
//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userDelete = await usersignup.findByIdAndDelete({ _id: id });
    // console.log(userDelete);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
//update a user
const udpateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const newData = await usersignup.findByIdAndUpdate({ _id: id }, data);
    res.json({ data: newData });
  } catch (error) {
    console.log(`error during the updateUser ${error}`);
  }
};
//find a single user
const findSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await usersignup.findById({ _id: id });
    res.json({ data });
  } catch (error) {
    console.log(`error during find a one user ${error}`);
  }
};
// add products
const addProduct = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const dataCheck = new Product(data);
    await dataCheck.save();
    res.json(dataCheck.email);
  } catch (error) {
    console.log(`error during adding a product ${error}`);
    console.log(error);
    res.json(error);
  }
};

// get all data but with limit
const getProduct = async (req, res) => {
  const pageNumber = req.body.pageNumber?req.body.pageNumber:1
  console.log("hello my data is here", pageNumber);
  try {
    const data = await Product.find().skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 3 ) : 0 ).limit(3);
    res.json({ data:data, pageNumber:pageNumber});
  } catch (error) {
    console.log(`error during the getall product data`);
  }
};
//get all the data only
const getAllTheProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.json({ data });
  } catch (error) {
    console.log(`error during the getall product data`);
  }
};
// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await Product.findByIdAndDelete({ _id: id });
    // console.log(userDelete);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
//update the products
const udpateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const newData = await Product.findByIdAndUpdate({ _id: id }, data);
    res.json({ data: newData });
  } catch (error) {
    console.log(`error during the update products ${error}`);
  }
};
//find a single product
const findSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.findById({ _id: id });
    res.json({ data });
  } catch (error) {
    console.log(`error during find a one user ${error}`);
  }
};
// admin singup
const signupAdmin = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    if (data.password === data.cpassword) {
      const dataCheck = new AdminData(data);
      await dataCheck.save();
      res.json(dataCheck.email);
    } else {
      res.json({ passerr: "passerr" });
    }
  } catch (error) {
    console.log(`error during signup ${error}`);
    console.log(error);
    res.json(error);
  }
};

//sign in data
const AdminSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExists = await AdminData.findOne({ email, password });
    // console.log(isExists);
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({ success: "success", user: isExists.email });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

// logic for services

// get all data
const getserviceData = async (req, res) => {
  try {
    const data = await ServiceData.find();
    res.json({ data });
  } catch (error) {
    console.log(`error during the getall data`);
  }
};
//delete user
const deleteServiceData = async (req, res) => {
  const { id } = req.params;
  try {
    const userDelete = await ServiceData.findByIdAndDelete({ _id: id });
    // console.log(userDelete);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
//update a user
const updateServiceData = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const newData = await ServiceData.findByIdAndUpdate({ _id: id }, data);
    res.json({ data: newData });
  } catch (error) {
    console.log(`error during the updateUser ${error}`);
  }
};
//find a single user
const findSingleService = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ServiceData.findById({ _id: id });
    res.json({ data });
  } catch (error) {
    console.log(`error during find a one user ${error}`);
  }
};
// add products
const addServices = async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const dataCheck = new ServiceData(data);
    await dataCheck.save();
    res.json(dataCheck.email);
  } catch (error) {
    console.log(`error during adding a product ${error}`);
    console.log(error);
    res.json(error);
  }
};

/////////////////////////////////

//find a user and then we must only add the record
const addtocart = async (req, res) => {
  const data = req.body;
  const email = { email: data.email };
  const title1 = data.title;
  try {
    const findData = await cartadd.find({ email: req.body.email });
    //if user does not exists
    if (findData.length === 0) {
      const data = new cartadd({ email: req.body.email, products: req.body });
      await data.save();
      res.json(data);
    }
    //if user exists
    if (findData.length !== 0) {
      const data = await cartadd.findOneAndUpdate(
        { email: req.body.email, "products.title": { $ne: req.body.title } },
        { $addToSet: { products: req.body } },
        { new: true }
      );
      if (data === null) {
        res.json({ Err: "You have already this item" });
      } else {
        res.json({ data });
      }
    }
  } catch (error) {
    console.log(`error during adding a product ${error}`);
    res.json({ err: "err" });
  }
};
// get all the products added to cart
const getallcartSingle = async (req, res) => {
  try {
    const data = await cartadd.find({ email: req.params.email });
    res.json({ data });
  } catch (error) {
    console.log(`error during the getall data ${error}`);
  }
};
// get all getallcartSinglelimited
const getallcartSinglelimited = async (req, res) => {
  const email = req.body;
  try {
    const data = await cartadd.find().limit(2);
    res.json({ data: data.map((val) => val) });
  } catch (error) {
    console.log(`error during the getall data ${error}`);
  }
};
//remove addto cart single item
const cartSingleRemove = async (req, res) => {
  const { id } = req.params;
  const email = req.body.user;
  try {
    const singleUserProduct = await cartadd.findOneAndUpdate(
      { email },
      {
        $pull: { products: { _id: id } },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
// find the single data for adding to the cart
const findSingleProductforadd = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Product.findById({ _id: id });
    res.json({ data });
  } catch (error) {
    console.log(`error during find a one product ${error}`);
  }
};
//update a addtocart-qty
const cartqtyUpdate = async (req, res) => {
  const { id } = req.params;
  const email = req.body.email;

  try {
    const newData = await cartadd.updateMany(
      { email: email, "products._id": id },
      { $set: { "products.$.qty": req.body.qty } }
    );
    res.json({ data: newData });
  } catch (error) {
    console.log(`error during the update cart qty ${error}`);
  }
};
//find a single user
const findSingleCartProduct = async (req, res) => {
  const { _id } = req.params;
  const email = req.body.user;
  try {
    //first we find out the whole doc by which user is login
    const data = await cartadd.findOne({ email });
    //we have a special id method for the for finding with id in the nested documents
    // console.log(data.products.id(_id));
    //so we have now the single document of the nested document
    res.json({ data: data.products.id(_id) });
  } catch (error) {
    console.log(`error during find a one user's product data ${error}`);
  }
};

//make payment
const makePayment = (req, res) => {
  const { totalPrice, token } = req.body;
  // console.log(totalPrice,token)
  const idempotencyKey = uuidv4(); //so that user don't be doubled charged from the same product
  //just in the reallity //we create stripe.customer.create({email,source:tokenid}).then((customer)=>) stripe.create a stripe.charges.create({amount:product.price*100,currency:"usd",customer:customer.id,receipt_email:token.email,description:product.name},{idempotencyKey on this transactoin}).then(result).catch(err)
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          // original account will be charged here,it recieves from the front end amount object value,for more details visit it ts file to for its object formulation
          amount: totalPrice * 100,
          currency: "pkr",
          customer: customer.id,

          //we can send email after a successfull transanction
          //it is now optional just sake of fun
          receipt_email: token.email,
          // description: `Your product name: ${product.name}`,
          //shipping can contain about the user's card
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_country,
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      //this result must contain a succedd payment data
      res.status(200).json(result);
    })
    .catch((err) => console.log(`error during the payment ${err}`));
};

// get all data
const orders = async (req, res) => {
  try {
    const data = await slip.find({ email: req.params.email });
    res.json({ data });
  } catch (error) {
    console.log(`error during the find orders for a single user${error}`);
  }
};
// customer after sales details
const userdataDetails = async (req, res) => {
  const data = req.body;

  try {
    const dataCheck = new custmOrders(data);
    await dataCheck.save();
  } catch (error) {
    console.log(`error during adding customer details ${error}`);
    console.log(error);
    res.json(error);
  }
};

// customer after sales details
const aftersalesemptycart = async (req, res) => {
  try {
    const dataCheck = await cartadd.findOneAndUpdate(
      { email: req.params.email },
      { $unset: { products: 1 } }
    );
  } catch (error) {
    console.log(`error during adding reomving empty cart ${error}`);
    console.log(error);
    res.json(error);
  }
};
// savePriceCalcRecord
const savePriceCalcRecord = async (req, res) => {
  const data = req.body;

  try {
    const dataCheck = new priceCalculator(data);
    await dataCheck.save();
    if (dataCheck) {
      res.json({ success: true });
    }
  } catch (error) {
    console.log(`error during adding price calculator ${error}`);
    res.json(error);
  }
};
// get data for user price calclutor
const getDataCalc = async (req, res) => {
  try {
    const data = await priceCalculator.find();
    res.json(data);
  } catch (error) {
    console.log(`error during getting data of price calculutor ${error}`);
  }
};
// updatePrice for admin
const updatePrice = async (req, res) => {
  try {
    const data = await priceCalculator.updateOne(req.body);
    res.json(data);
  } catch (error) {
    console.log(`error during updating of price calculutor ${error}`);
  }
};

// user slips after purchase
const saveSlip = async (req, res) => {
  async
    .each(req.body, async function (data, callback) {
      const userdata = new slip({
        email: req.params.email,
        title: data.title,
        price: data.price,
        totalPrice: data.totalPrice,
        oneProduct: data.oneProduct,
        image: data.selectedFile,
      });
      await userdata.save();
    })
    .catch((e) => console.log(e));
};

// const data = new slip({
//   email,
//   title,
//   price,
//   totalPrice,
//   oneProduct,
//   image,
// });
// await data.save();
// console.log(`this is ${data}`);

//verify User

const verifyUser = async (req, res) => {
  const { email } = req.params;
  try {
    const isExists = await usersignup.findOne({ email });
    // console.log(isExists);
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({
        success: "success",
        user: isExists.email,
        fulldata: isExists,
      });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//get all the orders to show admin
const allOrders = async (req, res) => {
  try {
    const isExists = await slip.find();
    // console.log(isExists);
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({
        success: "success",
        fulldata: isExists,
      });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};

//get all the orders to show admin
const update3d = async (req, res) => {
  const { pimage } = req.body;
  try {
    const isExists = await slip.findByIdAndUpdate(
      { _id: req.params.id },
      { pimage: pimage }
    );
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({
        success: "success",
      });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
//image first upload
const imageCrud = async (req, res) => {
  const { path: image } = req.file;
  try {
    const isExists = new ImgModel({ image });
    await isExists.save();
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({
        success: "success",
      });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
//get all the images
const showAllIamges = async (req, res) => {
  try {
    const isExists = await ImgModel.find();
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({
        success: "success",
        data: isExists,
      });
    }
  } catch (error) {
    console.log(`error during sigin the data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
//delete a single image
const deleteImage = async (req, res) => {
  try {
    const isExists = await ImgModel.findByIdAndDelete({
      _id: req.params.imgId,
    });
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({
        success: "success",
      });
    }
  } catch (error) {
    console.log(`error during delete single image data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
//updateImage a single image
const updateImage = async (req, res) => {
  const { path: image } = req.file;
  try {
    const isExists = await ImgModel.findByIdAndUpdate(
      {
        _id: req.params.imgId,
      },
      { image }
    );
    //respose
    if (isExists === null) {
      res.json({ err: "err" });
    }
    if (isExists !== null) {
      res.json({
        success: "success",
      });
    }
  } catch (error) {
    console.log(`error during delete single image data ${error}`);
    console.log(error);
    // res.json({err:error});
  }
};
module.exports = {
  signup,
  singin,
  getData,
  deleteUser,
  udpateUser,
  findSingleUser,
  addProduct,
  getProduct,
  deleteProduct,
  udpateProduct,
  findSingleProduct,
  AdminSignIn,
  signupAdmin,
  addServices,
  findSingleService,
  updateServiceData,
  saveSlip,
  deleteServiceData,
  getDataCalc,
  getAllTheProduct,
  getserviceData,
  addtocart,
  getallcartSingle,
  cartSingleRemove,
  findSingleProductforadd,
  getallcartSinglelimited,
  updatePrice,
  cartqtyUpdate,
  findSingleCartProduct,
  makePayment,
  orders,
  userdataDetails,
  aftersalesemptycart,
  savePriceCalcRecord,
  verifyUser,
  allOrders,
  update3d,
  imageCrud,
  showAllIamges,
  deleteImage,
  updateImage,
};
