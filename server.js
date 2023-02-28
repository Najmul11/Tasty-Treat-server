import app from './app.js'
import { connectDb } from './config/database.js'

connectDb()

app.get('/',(req, res)=>{
    res.send('Fine')
})
app.listen(process.env.PORT,()=>{
    console.log('server is working',process.env.PORT );
})