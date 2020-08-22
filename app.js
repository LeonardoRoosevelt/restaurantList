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
  res.render("index", { restaurant: restaurantList.results })
})

// params
app.get("/restaurants/:restaurant_id", (req, res) => {
  console.log(req.params.restaurant_id)
  const restaurant = restaurantList.results.filter(function(restaurant) {
    return restaurant.id === Number(req.params.restaurant_id)
    // req.params.restaurant_id 是字串 須加number 或用雙等號
  })
  res.render("show", {
    restaurant: restaurant[0]
  })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
