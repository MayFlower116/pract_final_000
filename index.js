const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");
});




const fs = require('fs');
const util = require('util')
const readFile = util.promisify(fs.readFile)

app.post("/myForm", (req, res) => {
  let user = req.body;
  // console.log(user)
  // console.log(user.name)
  new Promise((resolve, reject) => {
    const bookList = user.books.split(',');
    const artList = user.artists.split(',');
    resolve(bookList, artList)
  }).then((bookList, artList) => {
    new Promise((resolve, reject) => {
    
      const new_user = {
        "id": "[PLACEHOLD]",
        "name": user.name,
        "aboutMe": user.about,
        "githubUrl": user.gitURL,
        "twitterUrl": user.twitterURL,
        "favoriteBooks": [
          '[PLACEHOLD]',
          '[PLACEHOLD]'
        ],
        "favoriteArtists": [
          '[PLACEHOLD]',
          '[PLACEHOLD]'
        ]
      }
      // console.log(new_user)
      resolve(new_user)
    }).then((new_user) => {
      // console.log(new_user)
      // fs.readFile('./database.json', 'utf-8', (err, data) => {
      readFile('./database.json', 'utf-8').then((data) => {
        new Promise((resolve, reject) => {
        const database = JSON.parse(data)
        
        // console.log(new_user)
        // console.log("-------------------------")
        // console.log(database)

        database.users.push(new_user)
        resolve(database)
        }).then(() => {
          console.log(database)
        })
        
        

        // resolve()
      })//, (err, data) => {
        
        
      // }).then(() => {
      //   console.log('============== END ==================')
      // })
     
      // .then(() => {
      //   // webpage
      //   console.log('end====================')
      // })
    })
  })
  
})



app.get("/people/:id", (req, res) => {
  res.render("people");
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
