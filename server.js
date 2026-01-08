const express=require('express')
const app=express()
const PORT=process.env.PORT||3000
const path=require('path')
const {logger}=require('./middlewares/logger') 
const errorHandler = require('./middlewares/errorhandler')
const cookieParser=require('cookie-parser')


app.use(logger)
app.use(express.json())
app.use(cookieParser())
app.use("/",express.static(path.join(__dirname,"public")))

app.use("/",require('./routes/root'))

app.use((req,res)=>{
    res.status(404)
    if(req.accepts('html'))
    {
        res.sendFile(path.join(__dirname,"views","404.html"))
    }
    else if(req.accepts('json'))
    {
        res.json({message:'page not found'})
    }
    else{
        res.type('txt').send('404')
    }
})
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("Server is running")
    console.log(`http://localhost:${PORT}`)
}
)