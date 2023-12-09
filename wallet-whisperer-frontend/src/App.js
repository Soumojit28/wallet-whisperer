import React, { useEffect, useState } from 'react';
import './App.scss';
import Connect from "./components/connect/Connect";
import { useMetaMask } from "metamask-react";
import Home from "./pages/home/Home";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { status, connect, account } = useMetaMask();
  
  const query = window.location.search;
  const userName = new URLSearchParams(query).get('userName');
  const userId = new URLSearchParams(query).get('discordId');
  const token = new URLSearchParams(query).get('token');

  useEffect(() => {
    if (token === null || userId === null || userName === null) {
      setError("Invalid link, Please Generate new link in the Bot");
    }
  }, [query]);

  return (
    <main>
      {/* <Header/> */}
      {status === 'connected' ?
          <Home 
            setLoading={setLoading} 
            loading={loading} 
            error={error} 
            setError={setError} 
            account={account} 
            token={token} 
            userName={userName} 
            userId={userId} 
          /> :
          <Connect userName={userName} userId={userId} token={token} account={account} status={status} connect={connect} />
      }
      <div className="neon" id={(loading || status === 'connecting' || status === 'initializing') ? 'loading' : status === 'connected' ? error ? 'invalid' : 'connected' : ''}>
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
    </main>
  );
}

export default App;
