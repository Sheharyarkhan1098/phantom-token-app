import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Dashboard() {
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
                <li className='nav-item'>
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
                </li>
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
              </ul>
              <ul className=' ml-auto'>
                <button className='btn btn-primary navbtn'>CONNECT WALLET</button>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className='container'>
        <div className='banner' data-aos='fade-up' data-aos-duration='3000'>
          <h3 className='text-center phantom-text'>PHANTOM COIN</h3>
          <h1 className='text-center dashboard-text'>Dashboard</h1>
          <p className='text-center banner-detail'>
            {' '}
            Fantom is a global, decentralized network with validators and
            community members from all over planet earth. Fantom has a
            high-throughput open source smart contract platform for digital
            assets and dApps. Furthermore, Fantom is able to deliver
            unparalleled speed, security and reliability. Also, Fantom is highly
            scalable, being able to process over thousands of transactions per
            second, and scale to thousands of
            <br />
            nodes per second.{' '}
          </p>
        </div>
      </div>

      <div className='coin'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='box'>
                {' '}
                <img className='coinIcon' src='images/shiba.png' alt="shiba" />
                <h4 className='text-center coin'>SHIBA</h4>
                <h4 className='text-center dummytext'>Lorem Ipsum</h4>
                <h4 className='text-center dummytext'>Dolor sit amet</h4>
                <button className='btn btn-primary coinbtn'>Choose Now</button>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='box'>
                {' '}
                <img className='coinIcon' src='images/FTM.png' alt="ftm" />
                <h4 className='text-center coin'>FTM</h4>
                <h4 className='text-center dummytext'>Lorem Ipsum</h4>
                <h4 className='text-center dummytext'>Dolor sit amet</h4>
                <button className='btn btn-primary coinbtn'>Choose Now</button>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='box'>
                {' '}
                <img className='coinIcon' src='images/TOMB.png' alt='tomb'/>
                <h4 className='text-center coin'>TOMB</h4>
                <h4 className='text-center dummytext'>Lorem Ipsum</h4>
                <h4 className='text-center dummytext'>Dolor sit amet</h4>
                <button className='btn btn-primary coinbtn'>Choose Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='box'>
                {' '}
                <img className='coinIcon' src='images/TSHARE.png' alt="tshare"/>
                <h4 className='text-center coin'>TSHARE</h4>
                <h4 className='text-center dummytext'>Lorem Ipsum</h4>
                <h4 className='text-center dummytext'>Dolor sit amet</h4>
                <button className='btn btn-primary coinbtn'>Choose Now</button>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='box'>
                {' '}
                <img className='coinIcon' src='images/xy3s1.png' alt="coinicon"/>
                <h4 className='text-center coin'>XY3S1</h4>
                <h4 className='text-center dummytext'>Lorem Ipsum</h4>
                <h4 className='text-center dummytext'>Dolor sit amet</h4>
                <button className='btn btn-primary coinbtn'>Choose Now</button>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12'>
              <div className='box'>
                {' '}
                <img className='coinIcon' src='images/xy3s2.png' alt="x2"/>
                <h4 className='text-center coin'>XY3S2</h4>
                <h4 className='text-center dummytext'>Lorem Ipsum</h4>
                <h4 className='text-center dummytext'>Dolor sit amet</h4>
                <button className='btn btn-primary coinbtn'>Choose Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='footer'>
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
      </div>
    </div>
  );
}
