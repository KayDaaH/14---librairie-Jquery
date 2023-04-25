const express = require("express")
const port = 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use("/post", require("./server/routes/post.routes"))




app.listen(port, ()=> console.log("Le serveur à démarré au port " + port))