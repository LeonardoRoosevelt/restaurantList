const express = require("express")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")
const restaurantList = require("./restaurant.json")

//express template engine
//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// setting static files==>會先去看public資料夾
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("this is restaurant web")
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
