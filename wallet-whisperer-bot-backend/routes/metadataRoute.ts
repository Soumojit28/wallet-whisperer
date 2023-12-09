import express, { Request, Response } from 'express'


const router = express.Router()

router.get('/:tokenId', async (req: Request, res: Response) => {
    try {
        const { tokenId } = req.params
        const metadata = {
            name: `Wallet Whisperer NFT #${tokenId}}`,
            image: 'ipfs://QmfK6eGagnSNXNBi93LVdu2zBiYuyy7Vt5cbQ271iRM3YP',
            tokenId: tokenId
        }
        res.status(200).json(metadata)
    } catch (error) {
        res.status(500)
    }
})

export default router
