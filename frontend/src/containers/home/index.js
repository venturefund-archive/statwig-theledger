import React from 'react'
import 'typeface-roboto';
import './style.scss';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import logo from "../../assets/brands/VACCINELEDGER.png";
import lap from "../../assets/brands/lap.png";
import icon from "../../assets/brands/Block.png";
import icon1 from "../../assets/brands/temp.png";
import icon2 from "../../assets/brands/loc.png";
import icon3 from "../../assets/brands/chain.png";
import mob from "../../assets/brands/mobile.png";
import big from "../../assets/brands/how.png";
const HomeContainer = () => {
  return (
    <div className="Homecontainer">
      {/* Header */}  
      <div class="navbar">
         <a1 href="#" class="logo"><img src={logo}/></a1>
           <ul class="nav" >
           <li><a1 href="/track&Trace">Track&Trace</a1></li>
            <li><a1 href="/Login">login</a1></li>
                <li><a1 href="/Signup">Signup</a1></li>
           </ul>
        </div>
      {/* Header End */}
      {/* section1*/}
          <div className="back1">
          <MDBContainer>
             <MDBRow><MDBCol md="6" className="h0"> 
               <img id ="img0" src={logo}/>
                 <div id="Sign0">Vaccine ledger is a blockchain based platform<br></br>to track and trace vaccines journey acreoss the<br></br>supply chain</div>
                  <button className="button">View Demo</button> 
              </MDBCol>
           <MDBCol md="6" className="h1"> 
      <img id ="im1" src={lap}/>
        </MDBCol>
       </MDBRow>
       </MDBContainer>
       </div>
       {/*section1 end*/}
       {/*section2*/} 
       <div className="back2">
         <div id="heading">Our Solution</div>
           <div className="flex-container">
             <div><img id="block" src={icon}/></div>
             <div><img id="block1" src={icon1}/></div>
             <div><img id="block2" src={icon2}/></div>
             <div><img id="block3" src={icon3}/></div>
          </div>
          <div className="flex-container1">
             <div class="text">Blockchain enabled platform</div>
             <div class="text">Live Temperature Tracking</div>
             <div class="text">Live Location Tracking</div>
             <div class="text">Visibility Across Supplychain</div>
          </div>
       </div>
       {/*section2 end*/}
       {/*section3*/}
       <div className="back3">
       <MDBContainer>
         <MDBRow>
           <MDBCol md="6" className="h2"> 
              <div className="heading2">What We Do</div>
              <div id="Sign1">StaTwig provides serialization solutions to detect fake and expired products<br></br>in the production using blockchain technology and IoT.<br></br>We are focused towards creating an efficient food and vaccine distribution<br></br>supply cahin.This helps in preventing failures of distribution, predicting the<br></br>resources.Through our platform, we connect all stakeholders viatamper-<br></br>proof, open ledgers using our platform SC Blockchain</div>
        </MDBCol>
          <MDBCol md="6" className="h2"> 
              <img id ="im2" src={mob}/>
         </MDBCol>
        </MDBRow>
       </MDBContainer>
       </div>
       {/*section3 end*/}
       {/*section4*/}
       <div className="back4">
         <div class="heading3">How It Works</div>
         <div><img id="im3" src={big}/></div>
       </div>
       {/*section4 end*/}
       {/*section 5*/}
       <div className="back5">
         <div className="heading4">Contact Us</div>
         <div id="sign2">Interested in having chat with us about vaccine ledger ?<br></br>Drop your email below and we will get back to you shortly !</div>
         <div class="email-container">
           <form action="/email.php">
           <input type="text" placeholder="Enter Your Email Address" name="email"/>
             </form>
           </div>
             <button id="button1">submit</button>
             <svg class="Line_1" viewBox="0 0 398 1">
			<path fill="transparent" stroke="rgba(112,112,112,1)" stroke-width="0.3px" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" id="Line_1" d="M 0 0 L 398 0">
			</path>
		</svg>
    {/*section5 end*/}
        {/*Footer*/}
        <div className="flex-container2">
          <div><img id="logo" src={logo}/></div>
          <div>©2020 STATWIG</div>
          <div>Powered by blockchain</div>
        </div>
        {/*Footer end*/}
       </div>
    </div>    
  );
}

export default HomeContainer;