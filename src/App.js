import React from 'react';
import Form from './Form';
import './App.css';
const validationFunctions = require('./validationFunctions');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            errorMessages: []
        };
    }
    handleInputChange= (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const errorMessages = validationFunctions.validateInput(this.state.name, this.state.cardNumber,
            this.state.expiryDate, this.state.cvv); 

        if(errorMessages.length > 0) {
            this.setState({
                errorMessages: errorMessages
            });
        } else {
            console.log(this.state.name, this.state.cardNumber, this.state.expiryDate, this.state.cvv);
            this.setState({
                name: "",
                cardNumber: "",
                expiryDate: "",
                cvv: "",
                errorMessages: ["form successfully submitted"],
            });
        }
    }
    render() {
        return (
            <div className="app center">
                <Form
                    handleSubmit={(e) => {this.handleSubmit(e)}}
                    handleInputChange={this.handleInputChange}
                    name={this.state.name}
                    cardNumber={this.state.cardNumber}
                    expiryDate={this.state.expiryDate}
                    cvv={this.state.cvv}
                    errorMessages={this.state.errorMessages}
                />
            </div>
        );
    }
}

export default App;