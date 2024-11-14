import React, { useState } from 'react';
import './css/card.css';

const Card = ({ isOpen, onClose }) => {
    const [useShippingAddress, setUseShippingAddress] = useState(true);
    const [cardNumber, setCardNuber] = useState('');
    const [expDate, setExpDate] = useState(Date);
    const [cvc, setCVC] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [nickname, setNickname] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if (name === "cardNum") setCardNuber(value);
        if (name === "expDate") setExpDate(value);
        if (name === "cvc") setCVC(value);
        if (name === "cardHolder") setNameOnCard(value);
        if (name === "nickname") setNickname(value);
    };

    const saveCard = async() => {
    
        setErrors({});
        const today = new Date();
        const newErrors = {};
        // Checks if the user has entered in a card that has correct amount of numbers, the industry standard is at least 15 (American Express)
        console.log(cardNumber);
        console.log(expDate);
        console.log(cvc);
        console.log(nameOnCard);
        console.log(nickname);
        if(cardNumber.length < 15){
            console.log(cardNumber.length);
            newErrors.cardNumber = 'Please enter a valid card number';
        }
        if (expDate < today){
            newErrors.expDate = 'Please enter a card with a valid expiration date';
        }
        if (cvc.length < 3 && cvc.length > 4){
            console.log(cvc.length);
            newErrors.cvc = 'Please enter in a valid CVC';
        }
        if (!nameOnCard.trim()){
            console.log(nameOnCard);
            newErrors.nameOnCard = 'Please provide the name that is on the card';
        }
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }

        try{
            const response = await fetch('http://localhost:5000/api/save-payment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    cardNumber,
                    expDate,
                    cvc,
                    nameOnCard,
                    nickname
                  }),
            });

            const data = await response.json();

            if (response.status === 201){
                onClose
            } else {
                setErrors(data.errors);
            }
        } catch(error){
            console.log(error);
        }
    };

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
                        <input type="text" placeholder="Card number" name='cardNum' value={cardNumber} onChange={handleChange} required />
                        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Expiration date (MM / YY)</label>
                            <input type="date" placeholder="" name='expDate' value={expDate} onChange={handleChange} required />
                            {errors.expDate && <span className="error">{errors.expDate}</span>}
                        </div>

                        <div className="form-group">
                            <label>Security code</label>
                            <input type="text" placeholder="Security code" name='cvc' value={cvc} onChange={handleChange} required />
                            {errors.cvc && <span className="error">{errors.cvc}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Name on card</label>
                        <input type="text" placeholder="Name on card" name='cardHolder' value={nameOnCard} onChange={handleChange} required />
                        <small>Enter your name exactly as it’s written on your card</small>
                        {errors.nameOnCard && <span className="error">{errors.nameOnCard}</span>}
                    </div>

                    <div className="form-group">
                        <label>Nickname (optional)</label>
                        <input type="text" placeholder="Nickname" name="nickname" value={nickname} onChange={handleChange}/>
                    </div>

                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="use-shipping-address" checked={useShippingAddress} onChange={() => setUseShippingAddress(!useShippingAddress)}/>

                        <label htmlFor="use-shipping-address">
                            Use shipping address as billing address
                        </label>
                    </div>
                   
                    {billingAddressContent}
                    <div className="buttons-container">
                        <button type="button" className="save-button" onClick={saveCard}>Save</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Card;