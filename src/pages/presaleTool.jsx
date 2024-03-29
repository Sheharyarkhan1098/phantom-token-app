import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Interface from './Interface';


export default function PresaleTool() {

  const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [connected, setConnected] = useState(false);


    useEffect(() => {
      async function init() {
          const { address, status, conStat } = await getCurrentWalletConnected();
          setWallet(address)
          setStatus(status);
          setConnected(conStat);
          addWalletListener();

          // if (connected) {
          //     const amount = await web3.eth.getBalance(walletAddress);
          //     setMaxAmount(amount / weiAmount);
          // }
      }
      init();
  }, [walletAddress, connected]);

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "👆🏽 Buy PTM using DAI",
                    conStat: true,
                };
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                    conStat: false,
                };
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
                conStat: false,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
            conStat: false,
        };
    }
};


  function addWalletListener() {
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                setWallet(accounts[0]);
                setStatus("👆🏽 Buy PTM using DAI");
                setConnected(true);
            } else {
                setWallet("");
                setStatus("🦊 Connect to Metamask using the top right button.");
                setConnected(false);
            }
        });
    } else {
        setWallet("");
        setStatus(
            <p>
                {" "}
                🦊{" "}
                <a target="" href={`https://metamask.io/download.html`}>
                    You must install Metamask, a virtual Ethereum wallet, in your
                    browser.
                </a>
            </p>
        );
        setConnected(false);
    }
}






  const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "👆🏽 Buy SHUB using BNB",
                address: addressArray[0],
                conStat: true,
            };
            return obj;
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
                conStat: false,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
            conStat: false,
        };
    }
};

const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    setConnected(walletResponse.conStat);
}


  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div>
      <header className='header'>
        <nav className='navbar navbar-expand-lg navbar-light bg-transparent navbar-default'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='/#'>
              <img src='images/logo.png' alt='logo' />
            </a>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              {' '}
              <span></span> <span></span> <span></span>{' '}
            </button>
            <div
              className='collapse navbar-collapse justify-content-between'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  {' '}
                  <a className='nav-link active' aria-current='page' href='/#'>
                    HOME
                  </a>{' '}
                </li>
                {/* <li className='nav-item'>
                  {' '}
                  <a className='nav-link' href='/#'>
                    ABOUT
                  </a>{' '}
                </li>
                <li className='nav-item'>
                  {' '}
                  <a className='nav-link' href='/#'>
                    FEATURES
                  </a>{' '}
                </li>
                <li className='nav-item'>
                  {' '}
                  <a className='nav-link' href='/#'>
                    TOKENOMICS
                  </a>{' '}
                </li>
                <li className='nav-item'>
                  {' '}
                  <a className='nav-link' href='/#'>
                    ROADMAP
                  </a>{' '}
                </li> */}
                <li className='nav-item'>
                  {' '}
                  <a className='nav-link' href='/#'>
                    HOW TO BUY
                  </a>{' '}
                </li>
                <li className='nav-item dashboard-nav'>
                  {' '}
                  <a className='nav-link ' href='/#'>
                    DASHBOARD
                  </a>{' '}
                </li>
                <li className='nav-item dashboard-nav'>
                  {' '}
                  <a className='nav-link ' href='/#'>
                    PRESALE
                  </a>{' '}
                </li>
              </ul>
              <ul className=' ml-auto'>
                <button className='btn btn-primary navbtn' onClick={connectWalletPressed}>{walletAddress.length > 0 ? (
                        "Connected: " +
                        String(walletAddress).substring(0, 6) +
                        "..." +
                        String(walletAddress).substring(38)
                    ) : (
                            <span>CONNECT WALLET</span>
                        )}</button>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className='container'>
        <div className='banner' data-aos='fade-up' data-aos-duration='3000'>
          <h3 className='text-center phantom-text'>THE PHANTOM PROJECT</h3>
          <h1 className='text-center dashboard-text'>Presale</h1>
          <p className='text-center banner-detail'>
            {' '}
           Buy your PTM tokens now in presale for 0.008 DAI (FTM Chian) and get them without any fees.
          {' '}
          </p>
        </div>
      </div>

      <Interface connectedP={connected} statusP={status} walletAddressP={walletAddress} />
      

      {/* <div className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3 col-md-6 col-sm-12 d-none d-md-block  block-1'>
              <a className='footer-logo' href='/#'>
                <img src='images/Group.svg' alt="group"/>
              </a>
            </div>
            <div className='col-lg-5 col-md-6 col-sm-12  block-1'>
              <h3 className='footer-text'>
                Hold Phantom, and
                <br /> Passively Earn with <br /> it.
              </h3>
              <button className='btn btn-primary footerbtn'>
                BUY PHANTOM{' '}
                <i
                  className='fa fa-long-arrow-right'
                  style={{ fontSize: '13px', color: 'white' }}
                ></i>
              </button>
              <a
                href='/#'
                className='fa fa-facebook'
                style={{ fontSize: '13px', marginLeft: '10px' }}
              ></a>
              <a
                href='/#'
                className='fa fa-twitter'
                style={{ fontSize: '13px', marginLeft: '5px' }}
              ></a>
              <a
                href='/#'
                className='fa fa-youtube-play'
                style={{ fontSize: '13px', marginLeft: '5px' }}
              ></a>
              <a
                href='/#'
                className='fa fa-instagram'
                style={{ fontSize: '13px', marginLeft: '5px' }}
              ></a>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12 block-1'>
              <h5 className='footer_text'>Resources</h5>
              <br />
              <div className='row'>
                <div className='col-6'>
                  <ul className='no-bullets'>
                    <li> White Paper</li>
                    <li> Chart</li>
                    <li>Contract</li>
                  </ul>
                </div>
                <div className='col-6'>
                  <ul className='no-bullets'>
                    <li> Help</li>
                    <li> FAQs</li>
                    <li>Contact Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
