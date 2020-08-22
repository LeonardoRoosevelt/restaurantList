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
  res.render("index", { restaurants: restaurantList.results })
})

//querystring取得問號內容
app.get("/search", (req, res) => {
  const restaurants = restaurantList.results.filter(restaurant => {
    return (
      restaurant.name_en
        .toLowerCase()
        .includes(req.query.keyword.toLowerCase()) ||
      restaurant.name.includes(req.query.keyword) ||
      restaurant.category.includes(req.query.keyword)
    )
  })
  res.render("index", { restaurants: restaurants, keyword: req.query.keyword })
  // res.send("this is first project")
})

// params
app.get("/restaurants/:restaurant_name", (req, res) => {
  const restaurant = restaurantList.results.filter(function(restaurant) {
    return restaurant.name === req.params.restaurant_name
    // req.params.item_id 會是字串 須加number 或用雙等號
  })
  res.render("show", {
    restaurant: restaurant[0]
  })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
