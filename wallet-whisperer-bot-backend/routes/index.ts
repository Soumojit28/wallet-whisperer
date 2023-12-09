import express from 'express'
import metadataRoute from './metadataRoute'
import verifyRoute from './verifyRoute'
const router = express.Router()
router.get('/', (req, res) => {
    res.send('Hello World!')
    })
router.use('/metadata', metadataRoute)
router.use('/verify', verifyRoute)
    
export default router
