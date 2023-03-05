import React, { useState } from 'react';
import AutoCompleteIframe from './AutoCompleteIframe';
import './App.css';

function App() {
  const [formRef, setFormRef] = useState(null)
  return (
    <div className="App">
      <h1>iframe:</h1>
      <AutoCompleteIframe formRef={formRef}>
        <form id="address-form" action="" method="get" autoComplete="off" ref={setFormRef}>
        <p className="title">Sample address form for North America</p>
        <p className="note"><em>* = required field</em></p>
        <label className="full-field">
          <span className="form-label">Deliver to*</span>
          <input
            id="ship-address"
            name="ship-address"
            required
            autoComplete="off"
          />
        </label>
        <label className="full-field">
          <span className="form-label">Apartment, unit, suite, or floor #</span>
          <input id="address2" name="address2" />
        </label>
        <label className="full-field">
          <span className="form-label">City*</span>
          <input id="locality" name="locality" required />
        </label>
        <label className="slim-field-left">
          <span className="form-label">State/Province*</span>
          <input id="state" name="state" required />
        </label>
        <label className="slim-field-right" for="postal_code">
          <span className="form-label">Postal code*</span>
          <input id="postcode" name="postcode" required />
        </label>
        <label className="full-field">
          <span className="form-label">Country/Region*</span>
          <input id="country" name="country" required />
        </label>
        <button type="button" className="my-button">Save address</button>
      </form>
      </AutoCompleteIframe>
    </div>
  );
}

export default App;
