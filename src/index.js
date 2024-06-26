const express = require("express");
const cors = require("cors");
const router = require('../controller/routes');
const app = express();
const path = require("path")
app.use(cors());  
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb',extended: true }));
var Port = process.env.PORT || 1000;
app.use("/user",router)
app.use("/public//images//", express.static(path.join("public/images/")));
app.use("/public/images/", express.static(path.join("public/images/")));
app.use("/public\\images\\", express.static(path.join("public/images/")));
app.get("/",(req,res)=>{
  res.send("welcome to the hst construction")
})
app.listen(Port, () => {
  console.log(`server is listening at port ${Port}`);
});
