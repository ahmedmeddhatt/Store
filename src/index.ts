import express,{Application, Request , Response} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

// create instance server
const app:Application = express()

// parser incoming requests middleware
app.use(express.json())

const port = 3000

// http request logger middleware
app.use(morgan('common'))

// http security middleware
app.use(helmet())

// request limmiter middleware
app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message:
		'Too many accounts created from this IP, please try again after 15 minutes.',
    })
)
//adding route 
app.get('/',(req:Request, res:Response)=>{
res.status(200).send('hello world🌍')
})




// start express server
app.listen(port , ()=>{
    console.log(`Server is starting at port : ${port}`);
    
})

export default app