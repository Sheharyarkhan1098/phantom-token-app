import { useState, useEffect } from 'react';

import './custom.css';

import Web3 from 'web3'

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';

import { PTMAbi } from './abis';
import { DAIAbi } from './abis1';

const web3 = new Web3(Web3.givenProvider);

// const contractAddress = '0x3317608D9e70C3052c05C185299F990e04eB1191'; // testnet
const contractAddress = '0x130A8DE05A48055bEd7494c9a748B9Cd56779C94'; // mainnet
const PTMContract = new web3.eth.Contract(PTMAbi, contractAddress);
console.log(PTMContract)

const weiAmount = 1000000000000000000;
const tokenAmountPerBnb = 125;
const minAmount = 90;

// const DAI = '0x57413B5bCB754B3D842973EaD03a501309997a2a'; // testnet
const DAI = '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E'; // mainnet
const DAIContract = new web3.eth.Contract(DAIAbi, DAI);

const Interface = ({walletAddressP, statusP, connectedP}) => {
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [connected, setConnected] = useState(false);
    const [approved, setApproved] = useState(false);
    const [maxAmount, setMaxAmount] = useState(3500);
    const [inputAmout, setInputAmount] = useState(0);
    const [approvedAmount, setApprovedAmount] = useState(0);
    const listData = [
        {l1: "Presale Address", l2: "0x7853Ac81c1Cc9870B877ba6C05c614DA2a3a5548"},
        {l1: "Token Name", l2: "Phantom"},
        {l1: "Token Symbol", l2: "PTM"},
        {l1: "Token Decimals", l2: "9"},
        {l1: "Token Address", l2: "0x7853Ac81c1Cc9870B877ba6C05c614DA2a3a5548"},
        {l1: "", l2: " (Do not send FTM to the token address!)"},
        {l1: "Total Supply", l2: "100,000,000 PTM"},
        {l1: "Tokens For Presale", l2: "18,750,000 PTM"},
        {l1: "Presale Price", l2: "0,008 DAI"},
        {l1: "Listing Rate", l2: "0,01 DAI"},
        {l1: "Maximal Cap", l2: "150.000 DAI"},
        {l1: "Unsold Tokens	Burn", l2: "  "},
        {l1: "Presale Start Time", l2: "2022.03.31 17:00 (UTC)"},
        {l1: "Presale End Time", l2: "2022.04.02 17:00 (UTC)"},
        {l1: "Listing On", l2: "SpookySwap"},
        {l1: "Liquidity Lockup Time", l2: "365 days after pool ends"},

    ]


    useEffect(() => {
        setWallet(walletAddressP);
        setStatus(statusP);
        setConnected(connectedP);

    }, [walletAddressP, statusP, connectedP])

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

    useEffect(() => {
        async function checkApprove () {
            const result = await DAIContract.methods.allowance(walletAddress, contractAddress).call(); 
            console.log(result/weiAmount)
            setApprovedAmount(result / weiAmount)
        }
        if(walletAddress){
            checkApprove();
        }
    },[walletAddress, connected, approved])

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setStatus("👆🏽 Buy SHUB using BNB");
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

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const obj = {
                    status: "👆🏽 Buy PTM using DAI",
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

    const approveDai = async () => {
        if (inputAmout > maxAmount) {
            alert("Max amount is " + maxAmount);
            return;
        }

        if (inputAmout < minAmount) {
            alert("Min amount is " + minAmount);
            return;
        }

        if (inputAmout.length === 0) {
            alert("Input the amount");
            return;
        }
        
        // await DAIContract.methods.approve(contractAddress, `${inputAmout*weiAmount}`).send({
        await DAIContract.methods.approve(contractAddress,web3.utils.toBN(inputAmout+"000000000000000000")).send({
            from: walletAddress,
            to: DAI,
            // value: inputAmout * weiAmount
        });
        setApproved(!approved)
    } 

    const buyPressed = async () => {
        // let r = Math.floor(Math.random() * 3);
        // console.log(r);

        if (inputAmout > maxAmount) {
            alert("Max amount is " + maxAmount);
            return;
        }

        if (inputAmout < minAmount) {
            alert("Min amount is " + minAmount);
            return;
        }

        if (inputAmout.length === 0) {
            alert("Input the amount");
            return;
        }

        // if (r == 2) {
         
        // } else {
            await PTMContract.methods.depositAmount(web3.utils.toBN(inputAmout+"000000000000000000")).send({
                from: walletAddress,
                to: contractAddress,
                // value: inputAmout * weiAmount
            });
        // }
    }


    const claimPTM = async () => {
        await PTMContract.methods.claim().send({
            from: walletAddress,
            to: contractAddress,
            // value: inputAmout * weiAmount
        });
    }

    const onChangeInput = (e) => {
        if(e.target.value>=0)
        setInputAmount(e.target.value);
    }

    return (
        <div>
            {/* <div className="header2">
                <button id="walletButton" onClick={connectWalletPressed}>
                    {walletAddress.length > 0 ? (
                        "Connected: " +
                        String(walletAddress).substring(0, 6) +
                        "..." +
                        String(walletAddress).substring(38)
                    ) : (
                            <span>Connect Wallet</span>
                        )}
                </button>
            </div> */}

            <div className="content2">
                <div className="main">
                    {/* <div className="title">PTM Presale</div> */}

                    <div className="swapContent">
                        <h1 style={{color: "white", padding: 10}}>Buy your tokens now</h1>
                        <div className="swapTitle">Min Amount: 90 DAI, Max Amount: 3500 DAI</div>

                        <div className="tokenContent">
                            <img src={process.env.PUBLIC_URL + "assets/image/dai.png"} />
                            <div className="tokenName">DAI</div>
                            <div className="tokenValue" style={{display:'flex'}}>
                                <FormControl
                                    placeholder="Input DAI Amount"
                                    value={inputAmout}
                                    onChange={onChangeInput}
                                    type='number'
                                    style={{width: "80%"}}
                                />
                                <Button onClick={() => setInputAmount(3500)}>Max</Button>
                            </div>
                        </div>

                        <div className="tokenContent tokenContent1">
                            <div className="tokenImg" style={{background: "black"}}>
                                <img src={process.env.PUBLIC_URL + "assets/image/ptmNew.png"} />
                            </div>
                            <div className="tokenName">PTM</div>
                            <div className="tokenValue">
                                <FormControl
                                    disabled={true}
                                    value={inputAmout * tokenAmountPerBnb}
                                />
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {approvedAmount < inputAmout ? 
                        <Button className="swapBtn" onClick={approveDai} disabled={!connected}>Approve</Button>:
                        <Button className="swapBtn" onClick={buyPressed} disabled={!connected}>Buy</Button>}  
                                  
                        {window.ethereum ? 
                        <Button className="swapBtn" onClick={connectWalletPressed} disabled={connected}> {walletAddress.length > 0 ? (
                        "Connected: " +
                        String(walletAddress).substring(0, 6) +
                        "..." +
                        String(walletAddress).substring(38)
                    ) : (
                            <span>Connect Wallet</span>
                        )}</Button> :
                        <Button className="swapBtn" href={"https://metamask.app.link/dapp/presale.the-phantom-project.com/"} disabled={connected}>Connect Wallet</Button>}
                         <p style={{color: "white", margin: 10}}>Claim your PTM tokens at 17 UTC, 3rd April 2022</p>
                          {window.ethereum ? 
                        <Button className="swapBtn" onClick={claimPTM}  disabled={!connected} >Claim PTM</Button>:
                        <Button className="swapBtn" href={"https://metamask.app.link/dapp/presale.the-phantom-project.com/"}  >Claim PTM</Button>}
                        </div>
                    <div style={{color: "white", padding: 20, marginTop: 20}}>
                                {listData.map(obj => ( <div style={{display: "flex", justifyContent: "space-between", fontSize: 12}}>
                                 
                                    <p>{obj.l1}</p>
                                    <p style={{textAlign: "left"}}>{obj.l2}</p>
                                  
                                </div>))}
                    </div>
                    </div>

                    <div>
                        <p id="status" style={{color: 'white'}}>
                            {status}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interface;