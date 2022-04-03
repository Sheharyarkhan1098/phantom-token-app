import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Web3 from "web3";
import BOO_LOGO from "../../src/images/BOO_LOGO.png";
import TOMB from "../../src/images/TOMB.png";
import FTM from "../../src/images/FTM.png";
import LUNA_LOGO from "../../src/images/LUNA_LOGO.png";
import Dai_logo from "../../src/images/dai_logo.png";
import { PTMtoken } from "./ptmTokenAbis";
import { isMobile } from "react-device-detect";
import Button from 'react-bootstrap/Button';

const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0x7853Ac81c1Cc9870B877ba6C05c614DA2a3a5548"; // mainnet
const PTMContract = new web3.eth.Contract(PTMtoken, contractAddress);
console.log(PTMContract);

export default function Dashboard() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [connected, setConnected] = useState(false);

  const tokensData = [
    {
      name: "Fantom",
      img: FTM,
      des: "",
      address: "",
    },
    {
      name: "DAI token",
      img: Dai_logo,
      des: "",
      address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
    },
    {
      name: "TOMB token",
      img: TOMB,
      des: "",
      address: "0x6c021ae822bea943b2e66552bde1d2696a53fbb7",
    },
    {
      name: "BOO token",
      img: BOO_LOGO,
      des: "",
      address: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE",
    },
    {
      name: "Terra LUNA",
      img: LUNA_LOGO,
      des: "",
      address: "0x95dD59343a893637BE1c3228060EE6afBf6F0730",
    },
  ];

  useEffect(() => {
    async function init() {
      const { address, status, conStat } = await getCurrentWalletConnected();
      setWallet(address);
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

  const setRewardToken = async (address) => {
    if (!address) {
      await PTMContract.methods.unsetRewardToken().send({
        from: walletAddress,
        to: contractAddress,
        // value: inputAmout * weiAmount
      });
      alert("token set!!");
      return true;
    }
    await PTMContract.methods.setRewardToken(address).send({
      from: walletAddress,
      to: contractAddress,
      // value: inputAmout * weiAmount
    });
    alert("token set!!");
  };

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    setConnected(walletResponse.conStat);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent navbar-default">
          <div className="container-fluid" style={{maxWidth: 1140}}>
            <a className="navbar-brand" href="/#">
              <img src="images/logo.png" alt="logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {" "}
              <span></span> <span></span> <span></span>{" "}
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarSupportedContent"
            >
              <a className="nav-link active" aria-current="page" href="https://the-phantom-project.com">
                    HOME
                  </a>
              {/* <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link active" aria-current="page" href="/#">
                    HOME
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/#">
                    ABOUT
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/#">
                    FEATURES
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/#">
                    TOKENOMICS
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/#">
                    ROADMAP
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/#">
                    HOW TO BUY
                  </a>{" "}
                </li>
                <li className="nav-item dashboard-nav">
                  {" "}
                  <a className="nav-link " href="/#">
                    DASHBOARD
                  </a>{" "}
                </li>
              </ul> */}
              <ul className=" ml-auto">
                {window.ethereum ?
                <button
                  className="btn btn-primary navbtn"
                  onClick={connectWalletPressed}
                >
                  {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                  ) : (
                    <span>CONNECT WALLET</span>
                  )}
                </button> :
                <Button
                    className="btn btn-primary navbtn"
                    href={"https://metamask.app.link/dapp/dashboard.the-phantom-project.com/"}
                  >
                    {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                  ) : (
                    <span>CONNECT WALLET</span>
                  )}
                  </Button>}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="banner" data-aos="fade-up" data-aos-duration="3000">
          <h3 className="text-center phantom-text">PHANTOM TOKEN</h3>
          <h1 className="text-center dashboard-text">Dashboard</h1>
          <p className="text-center banner-detail">
            {" "}
            Fantom is a global, decentralized network with validators and
            community members from all over planet earth. Fantom has a
            high-throughput open source smart contract platform for digital
            assets and dApps. Furthermore, Fantom is able to deliver
            unparalleled speed, security and reliability. Also, Fantom is highly
            scalable, being able to process over thousands of transactions per
            second, and scale to thousands of
            <br />
            nodes per second.{" "}
            <br />
          </p>
        </div>
               <div style={{display: "flex", justifyContent: "center"}}>
               {window.ethereum ?
                 <button
                  data-aos="fade-up"
                  data-aos-duration="3000"
                  className="btn btn-primary navbtn"
                  onClick={connectWalletPressed}
                >
                  {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                  ) : (
                    <span>CONNECT WALLET</span>
                  )}
                </button> :
                 <Button
                  data-aos="fade-up"
                  data-aos-duration="3000"
                  className="btn btn-primary navbtn"
                  href={"https://metamask.app.link/dapp/dashboard.the-phantom-project.com/"}
                >
                  {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                  ) : (
                    <span>CONNECT WALLET</span>
                  )}
                </Button>}
                </div>
      </div>

      <div className="coin">
        <div className="container">
            <h2 style={{margin: "20px 0", color: "white", textAlign: "center"}}> Connect to your wallet and select your favorite token from the list to get reflected in. </h2>
          <div className="row">
            {tokensData.map((obj) => (
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="box">
                  {" "}
                  <img className="coinIcon" src={obj.img} alt="shiba" />
                  <h4 className="text-center coin">{obj.name}</h4>
                  <h4 className="text-center dummytext">{obj.des}</h4>
                  {window.ethereum ? 
                  <button
                    className="btn btn-primary coinbtn"
                    onClick={() => setRewardToken(obj.address)}
                  >
                    Set as Reward
                  </button> :
                  <Button
                    className="btn btn-primary coinbtn"
                    href={"https://metamask.app.link/dapp/dashboard.the-phantom-project.com/"}
                  >
                    Set as Reward
                  </Button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 d-none d-md-block  block-1">
              <a className="footer-logo" href="/#">
                <img src="images/Group.svg" alt="group" />
              </a>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12  block-1">
              <h3 className="footer-text">
                Hold Phantom, and
                <br /> Passively Earn with <br /> it.
              </h3>
              <button className="btn btn-primary footerbtn">
                BUY PHANTOM{" "}
                <i
                  className="fa fa-long-arrow-right"
                  style={{ fontSize: "13px", color: "white" }}
                ></i>
              </button>
              <a
                href="/#"
                className="fa fa-facebook"
                style={{ fontSize: "13px", marginLeft: "10px" }}
              ></a>
              <a
                href="/#"
                className="fa fa-twitter"
                style={{ fontSize: "13px", marginLeft: "5px" }}
              ></a>
              <a
                href="/#"
                className="fa fa-youtube-play"
                style={{ fontSize: "13px", marginLeft: "5px" }}
              ></a>
              <a
                href="/#"
                className="fa fa-instagram"
                style={{ fontSize: "13px", marginLeft: "5px" }}
              ></a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-1">
              <h5 className="footer_text">Resources</h5>
              <br />
              <div className="row">
                <div className="col-6">
                  <ul className="no-bullets">
                    <li> White Paper</li>
                    <li> Chart</li>
                    <li>Contract</li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul className="no-bullets">
                    <li> Help</li>
                    <li> FAQs</li>
                    <li>Contact Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
