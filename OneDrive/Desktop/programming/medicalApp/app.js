var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// //var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express();

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // app.use('/cats', indexRouter);
// app.use('/users', usersRouter);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



require("./routes/mongos")
const inv=require("./routes/inventories") //inventory data
const login=require("./routes/login") //login data
const patients=require("./routes/patients")//patients data

app.use(express.json())

//Inventory Post and Get
app.post('/inventory', (req,res)=>{
    const inventory=new inv(req.body)
    console.log(req.body)
    inventory.save().then(()=>{
        res.send(inventory)
    }).catch((err)=>{
        res.send(err)
    })
})

app.get("/inventory", (req, res)=>{
    inv.find({}).then((inventory)=>{
        res.send(inventory)
    })
})
//find by product id
app.get("/inventory/:prodid", (req,res)=>{
    inv.findOne({Product_Id:req.params.prodid}).then((inventory)=>{
        res.send(inventory)
    })
})
//find by product name
app.get("/inv/:prodname", (req,res)=>{
    inv.findOne({Product:req.params.prodname}).then((inventory)=>{
        res.send(inventory)
    })
})
//inventory delete
app.delete('/inventory/:prodid', async (req, res)=>{
    try{
        const invry=await inv.findOneAndDelete({Product_Id: req.params.prodid})
        if(!invry){
            return res.status(404).send()
        }
        res.send(invry)
    }
    catch(err){
        res.status(500).send()
    }
})

//inventory Update
app.patch('/inventory/:prodid', async (req, res)=>{
    try{
        const invry=await inv.findOneAndUpdate({Product_Id: req.params.prodid}, req.body, {new: true, runValidators:true})
        if (!invry){
            return res.status.send(404).send()
        }
        res.send(invry)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//Login Post and Get
app.post('/login', (req, res)=>{
    const signin=new login(req.body)
    signin.save().then(()=>{
        res.send(signin)
    }).catch((err)=>{
        res.send(err)
    })
})
app.get("/login", (req, res)=>{
    login.find({}).then((log)=>{
        res.send(log)
    })
})

//Patients post and get
app.post('/patients', (req,res)=>{
    const patient=new patients(req.body)
    patient.save().then(()=>{
        res.send(patient)
    }).catch((err)=>{
        res.send(err)
    })
})
app.get("/patients", (req,res)=>{
    patients.find({}).then((pat)=>{
        res.send(pat)
    })
})

//Patient find by roll no
app.get("/patients/:roll", (req,res)=>{
    patients.findOne({Roll_No:req.params.roll}).then((pat)=>{
        res.send(pat)
    })
})

//Patient find by name
app.get("/patient/:name",(req,res)=>{
    patients.findOne({Name:req.params.name}).then((pat)=>{
        res.send(pat)
    })
})

//Patient Update
app.patch("/patients/:roll", async (req, res)=>{
    try{
        const pat=await patients.findOneAndUpdate({Roll_No: req.params.roll}, req.body, {new: true, runValidators:true})
        if (!pat){
            return res.status.send(404).send()
        }
        res.send(pat)
    }
    catch(err){
        res.status(400).send(err)
    }
})
module.exports=app