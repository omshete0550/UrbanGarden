import React from "react";
import "./ContactUs.css";
const ContactUs = () => {
  return (
    <>
      <div className="contactContainer">
        <div className="contactContent">
          <h1>Inquire now</h1>
          <p>
            Fill in the form to get in touch with our team for any business and
            general enquiries.
          </p>
        </div>
        <div className="contactInput">
          <div className="contactInputInner">
            <div class="input-container">
              <input type="text" id="input" required="" />
              <label for="input" class="label">
                Name*
              </label>
              <div class="underline"></div>
            </div>
            <div class="input-container">
              <input type="email" id="input" required="" />
              <label for="input" class="label">
                Email ID*
              </label>
              <div class="underline"></div>
            </div>
            <div class="input-container">
              <input type="number" id="input" required="" />
              <label for="input" class="label">
                Phone Number*
              </label>
              <div class="underline"></div>
            </div>
            <div class="input-container">
              <input type="text" id="input" required="" />
              <label for="input" class="label">
                Message
              </label>
              <div class="underline"></div>
            </div>
          </div>
          <button>Submit</button>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
