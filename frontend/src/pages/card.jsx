import React, { useState } from 'react';
import './css/card.css';

const Card = ({ isOpen, onClose }) => {
    const [useShippingAddress, setUseShippingAddress] = useState(true);

    if (!isOpen) {
        return null;
    }
    
    let billingAddressContent;

    if (!useShippingAddress) {

        billingAddressContent = (
            <div className="billing-address">
                <h3>Billing Address</h3>

                <div className="form-group">
                    <label>Country/Region</label>
                    <input type="text" placeholder="Country/Region" required />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" placeholder="First name" required />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" placeholder="Last name" required />
                    </div>
                </div>
                <div className="form-group">
                    <label>Company (optional)</label>
                    <input type="text" placeholder="Company" />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Address" required />
                </div>
                <div className="form-group">
                    <label>Apartment, suite, etc. (optional)</label>
                    <input type="text" placeholder="Apartment, suite, etc." />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" placeholder="City" required />
                    </div>
                    <div className="form-group">
                        <label>Province</label>
                        <input type="text" placeholder="Province" required />
                    </div>
                    <div className="form-group">
                        <label>Postal code</label>
                        <input type="text" placeholder="Postal code" required />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay open">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Add Card</h2>
                <form>

                    <div className="form-group">
                        <label>Card number</label>
                        <input type="text" placeholder="Card number" required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Expiration date (MM / YY)</label>
                            <input type="text" placeholder="MM / YY" required />
                        </div>

                        <div className="form-group">
                            <label>Security code</label>
                            <input type="text" placeholder="Security code" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Name on card</label>
                        <input type="text" placeholder="Name on card" required />
                        <small>Enter your name exactly as it’s written on your card</small>
                    </div>

                    <div className="form-group">
                        <label>Nickname (optional)</label>
                        <input type="text" placeholder="Nickname" />
                    </div>

                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="use-shipping-address" checked={useShippingAddress} onChange={() => setUseShippingAddress(!useShippingAddress)}/>

                        <label htmlFor="use-shipping-address">
                            Use shipping address as billing address
                        </label>
                    </div>
                   
                    {billingAddressContent}
                    <div className="buttons-container">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Card;