import React, { useState } from 'react';
import './home.scss';
import { ethers } from "ethers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ token, userId, userName, setLoading, loading, error, setError, account }) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const toastOptions = {
    position: "bottom-left",
    type: "success",
    closeButton: false,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    theme: "dark",
    icon: false,
    style: {
      textAlign: 'center',
      borderRadius: '15px',
      color: "rgb(11,249,0)",
      border: "2px solid rgb(11,249,0)",
      paddingBottom: "0.5rem",
      paddingTop: "0.5rem",
      fontSize: "16px",
      fontFamily: "'Silom', sans-serif",
      width: '30rem',
    }
  }

  const cutAddress = (account) => {
    return account?.substring(0, 5) + "...." + account?.substring(account.length - 4);
  };

  const Signer = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const message = `You need to sign this message to verify ownership and connect this account with discord. token - ${token} discordId - ${userId}`
      //const message = `Wallet: ${signer}, DiscordId: ${userId}, Token: ${token}`
      const signature = await signer.signMessage(message)
      return { signature, address, message };
    } catch (e) {
      // console.log(e);
      return false;
    }
  }

  const handleSign = async () => {
    setLoading(true)
    const signCheck = await Signer();
    if (!signCheck) {
      // toast('Signature denied!', toastOptions)
    } else {
      try {
        const { data } = await axios.post('https://discordid-be.onrender.com/verify',
          {
            address: signCheck.address,
            message: signCheck.message,
            signature: signCheck.signature,
            userId: userId,
            token: token
          })
        if (data.status === true) {
          setSuccessMessage(`Your're all set! Now close this tab and head back to the server.`);
          setTxHash(data.txReceipt.transactionHash);
        } else {
          setError(data.message);
        }
      } catch (e) {
        setError(e.response.data.message);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <ToastContainer />
      <div className='main_div'>
        <div className='middle_panel_div'>
        {loading ?
          <p>Processing...</p> :
          error ?
            <p>{error || "Something went wrong!"}</p> : !successMessage ?
              <>
                <p>GM ! {userName},</p>
                <p>You've connected with {cutAddress(account)}.</p>
                <p>Click below to Get Your Wallet Whisperer NFT!</p>
                <button onClick={handleSign} className='button'>Authenticate</button>
              </> : 
              <>
                <p>{successMessage}</p>
                <p>Transaction Hash:</p>
                <p>{txHash}</p>
              </>
          }
        </div>
      </div>
    </>
  )
}

export default Home;

