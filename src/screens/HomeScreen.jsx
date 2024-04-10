import React from "react";
import "../styles/homescreen.css";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import img1 from "../assets/c1.png";
import img2 from "../assets/c2.png";
import img3 from "../assets/c3.png";
import img4 from "../assets/c4.png";
import img5 from "../assets/c5.png"
const HomeScreen = () => {
  const { user } = useUser();
  const primaryWeb3Wallet = user?.primaryWeb3Wallet;
  const checkIfUserHasMetamask = () => {
    if (
      primaryWeb3Wallet === "" ||
      primaryWeb3Wallet === null ||
      primaryWeb3Wallet === undefined
    ) {
      return (
        <div className="meta-msg">
          <span>Metamask not connected. Please connect to metamask.</span>
          <Link>Connect metamask</Link>
        </div>
      );
    }
  };

  let slideIndex = 0;

  function showSlides() {
    const slides = document.querySelectorAll('.carousel-item');
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex].style.display = 'block';
  }

  // function nextSlide() {
  //   slideIndex++;
  //   showSlides();
  // }

  // function prevSlide() {
  //   slideIndex--;
  //   showSlides();
  // }

  // Automatic rotation
  setInterval(() => {
    slideIndex++;
    showSlides();
  }, 5000);


  return (
    <div className="home-container">
      <div className="navbar">
        <div class="company-name" data-aos="slide-left">Ether Shuttle</div>
        <div className="user-button-container" data-aos="slide-right">
          <UserButton
            showName={true}
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonOuterIdentifier: {
                  color: "white",
                  fontSize: "2rem"
                },
              },
            }}
          />
          {checkIfUserHasMetamask()}
        </div>
      </div>

      <div class="carousel" id="myCarousel">
        <div class="carousel-inner" >
          <div class="carousel-item active" data-aos="fade-up">
            <img src={img1} alt="Image 1" />
            <div class="carousel-caption">
            <h4>BlockChain Powered Car Pooling</h4>
            <h6>A Revolution in the world of Car Pooloing.</h6>
            </div>
          </div>
          <div class="carousel-item">
            <img src={img2} alt="Image 2" />
            <div class="carousel-caption">
            <h4>Multiple Upsides</h4>
          <h6>The project comes with a wide variety of both <br /> Environmental & Technological advantages.</h6>

            </div>
          </div>
          <div class="carousel-item">
            <img src={img3} alt="Image 3" />
            <div class="carousel-caption">
            <h4>Decentralization</h4>
          <h6>Blockchain comes with the feature of 'Decentralization'<br /> enhancing Trust and Security.</h6>

            </div>
          </div>
          <div class="carousel-item">
            <img src={img4} alt="Image 4" />
            <div class="carousel-caption">
            <h4>Smart Contracts</h4>
          <h6>Ensuring money security and secure & seamless payments b/w users.</h6>
            </div>
          </div>
          <div class="carousel-item">
            <img src={img5} alt="Image 5" />
            <div class="carousel-caption">
            <h4>Join Us!!</h4>
          <h6>Become a part of our family and revolutionize car-pooling.</h6>
            </div>
          </div>
        </div>

        {/* <button class="carousel-btn prev-btn" onClick="prevSlide()">&#10094;</button>
        <button class="carousel-btn next-btn" onClick="nextSlide()">&#10095;</button> */}
      </div>

      <div className="homescreen-body">
        <h1>This is the home screen </h1>
      </div>
    </div>
  );
};

export default HomeScreen;
