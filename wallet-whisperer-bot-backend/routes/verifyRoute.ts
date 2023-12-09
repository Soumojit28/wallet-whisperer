import express from "express";
import verify from "../services/verifyService";
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { address, message, signature, userId, token } = req.body;
    const result = await verify(address, message, signature, userId, token);
    
    if (result.status) {
      //TODO: send message to discord user
      return res.status(200).send(result);
    } else {
      return res.status(500).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
