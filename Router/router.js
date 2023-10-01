const express = require("express");
const router = express.Router();
const session = require("express-session");

const credential = {
  email: "akashpachol2001@gmail.com",
  password: "akash@28",
};
const product = [
  {
    cardvalue: "Classic leather",
    url: "https://imagescdn.reebok.in/img/app/product/9/919795-11524629.jpg?q=75&auto=format&w=387",
  },
  {
    cardvalue: "Running Shoes",
    url: "https://imagescdn.reebok.in/img/app/product/9/921369-11570205.jpg?q=75&auto=format&w=387",
  },
  {
    cardvalue: "Performans &Style",
    url: "https://imagescdn.reebok.in/img/app/product/9/921365-11570169.jpg?q=75&auto=format&w=387",
  },
  {
    cardvalue: "Slides",
    url: "https://imagescdn.reebok.in/img/app/product/9/915219-11382452.jpg?q=75&auto=format&w=387",
  },
];

router.use(
  session({
    secret: "your-secret-key", // Set a secret key for session encryption
    resave: false,
    saveUninitialized: true,
  })
);


function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.redirect("/"); // Redirect to login page if not authenticated
}

router.get("/",(req,res)=>{
  

  if(req.session.user){
    res.redirect('/home')
}else{
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");

        res.render('base',{title:'Login ',error:'false'})

}

})

router.post("/", (req, res) => {

  const { email, password } = req.body;

  if (email === credential.email && password === credential.password) {
    req.session.isAuthenticated = true;
    req.session.user = req.body.email;
    res.redirect("/home");
  } else if (email != credential.email && password != credential.password) {
    res.render("base", {
      title: "Login",
      error_email: "Invalid email",
      error_password: "Invalid password",
    });
  } else if (email != credential.email) {
    res.render("base", { title: "Login", error_email: "Invalid email" });
  } else if (password != credential.password) {
    res.render("base", { title: "Login", error_password: "Invalid password" });
  } else {
    res.render("base");
  }
});

router.get("/home", isAuthenticated, (req, res) => {
  if (req.session.user) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");


    res.render("home", { user: req.session.user, product });
  } else {
    res.render("base");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("err");
    } else {
      // Include the script tag in the response

res.redirect('/')
    }
  });
});


router.use((req,res)=>{
  
res.send("jjjjj")

})

module.exports = router;