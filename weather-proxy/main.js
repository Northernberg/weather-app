const express = require("express")
const app = express()
const cors = require("cors")
const { default: axios } = require("axios")

app.use(cors())

app.get("/", async (req, res) => {
    const {lon, lat} = req.query;
    response = await axios.request(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
    .then((response)=>{
        console.log(response);
        res.send(response.data)
    }
    )
})

app.listen((3001), ()=>{
    console.log("express on port 3001");
})