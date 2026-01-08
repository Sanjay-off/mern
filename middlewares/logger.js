const {format}=require('date-fns')
const {v4:uuid}=require('uuid')
const fs=require('fs')
const fspromises=require('fs').promises
const path=require('path')
const logEvents=async (message,logFile)=>{
    const dateTime=`${format(new Date(),'yyyyMMdd')}`
    const logItem=`${dateTime}\t${uuid()}\t${message}\n`
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs')))
        {
            await fs.mkdir(path.join(__dirname,'..','logs'))
        }
        await fspromises.appendFile(path.join(__dirname,'..','logs',logFile),logItem)
    }
    catch(err){
        console.log(err)
    }
}

const logger=(req,res,next)=>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,`reqlog.log`)
    console.log(`${req.method}\t${req.path}`)
    next()
}

module.exports={logger,logEvents}