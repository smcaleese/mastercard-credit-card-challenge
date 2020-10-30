import React from 'react';
import './App.css';

class Form extends React.Component {
    render() {
        const errorMessagesList = this.props.errorMessages.map((errorMessage) =>
            <li key={errorMessage.toString()}>
                {errorMessage}
            </li>
        );
        return (
            <form id="credit-card-form" className="center" onSubmit={(e) => {this.props.handleSubmit(e)}}>
                <div id="credit-card-header-div">
                    <h2>Credit Card Details</h2>
                </div>
                <div id="input-box">
                    <div className="input-group">
                        <input type="text" value={this.props.name} onChange={this.props.handleInputChange}
                            name="name" id="name" className="text" placeholder="Your name" required/>
                    </div>
                    <div className="input-group">
                        <input type="text" value={this.props.cardNumber} onChange={this.props.handleInputChange}
                            name="cardNumber" id="credit-card-number" className="text" placeholder="Card Number" required/>
                    </div>
                    <div className="input-group small-inputs">
                        <input type="text" value={this.props.expiryDate} onChange={this.props.handleInputChange}
                            name="expiryDate" id="expiry-date" className="text" placeholder="MM/YY" required/>
                        <input type="text" value={this.props.cvv} onChange={this.props.handleInputChange}
                            name="cvv" id="cvv" className="text" placeholder="CVV" required/>
                    </div>
                    <div className="input-group center">
                        <input type="submit" id="submit-button"/>
                    </div>
                </div>
                <ul id="error-messages-list">{errorMessagesList}</ul>
            </form>
        );
    }
}

export default Form;