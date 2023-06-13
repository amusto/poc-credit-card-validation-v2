import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

import { SUPPORTED_CREDIT_CARDS } from "./services";

import './App.css';

const App = () => {
    const [creditCardInputValue, setCreditCardInputValue] = useState('');
    const [validationStatusMessage, setValidationStatusMessage] = useState();
    const [formInputErrorMessage, setFormInputErrorMessage] = useState();
    const [isCardType, setIsCardType] = useState();

    const {
        register,
        trigger,
        formState: { errors },
        getValues
    } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        setFormInputErrorMessage();
    }, [])

    useEffect(() => {
        if (isCardType) {
            const validMessage = `Card Type: ${isCardType?.name}`;
            setValidationStatusMessage(validMessage);
        } else {
            setValidationStatusMessage();
        }
    }, [isCardType, setValidationStatusMessage])

    const clearErrors = () => {
        setIsCardType();
        setFormInputErrorMessage();
    }

    const identifyType = async (e) => {
        let matchFound;
        const inputString = e.target?.value.replace(/\D/g, '');
        setCreditCardInputValue(inputString);

        if (inputString?.length > 3) {
            const isMatchingCCType = SUPPORTED_CREDIT_CARDS.filter(i => {
                const testMatch = new RegExp(i?.identifyRegex);
                const isMatch = testMatch.test(inputString);
                if (isMatch) {
                    return i;
                }
            });

            if (isMatchingCCType.length <= 0) {
                setFormInputErrorMessage("In-valid formatted Credit Card Number");
            } else {
                setFormInputErrorMessage();
            }

            setIsCardType(isMatchingCCType[0])
            matchFound = isMatchingCCType[0];
            return matchFound;
        } else {
            clearErrors();
        }
    }

    const validateCreditCardNumber = async () => {
        let isValidMatch = false;

        if (isCardType) {
            const testMatch = new RegExp(isCardType?.validateRegex);
            isValidMatch = testMatch.test(creditCardInputValue);
        }

        return isValidMatch;
    }

    const onSubmit = async () => {
        await trigger("creditCardNumber");

        const isValidCCNumber = await validateCreditCardNumber(creditCardInputValue);

        if (!isValidCCNumber && isCardType) {
            setFormInputErrorMessage(`The entered number is not a valid ${isCardType?.name} card!`);
        }

        if (isValidCCNumber) {
            const validMessage = `Card Type: ${isCardType?.name} IS VALID!!!`;
            setValidationStatusMessage(validMessage);
        } else {
            const validMessage = `Card Type: ${isCardType?.name} IS NOT VALID!!!`;
            setValidationStatusMessage(validMessage);
        }
    };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter a Credit card number to validate.
        </p>
      </header>

        <div className="App-contents">
            <div className="validation-header">
                <div>Enter your Credit Card number below!</div>
                <div className="valid-cc-message mt-3 mb-3">{validationStatusMessage}</div>
            </div>
            <Form.Group className="mb-3" controlId="creditCardNumber">
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control
                    type="text"
                    value={creditCardInputValue}
                    placeholder="Enter a valid Credit card number"
                    {...register("creditCardNumber", {
                        required: "Please enter a valid Credit Card Number",
                        onChange: identifyType
                    })}
                />
                {formInputErrorMessage && <span className="validation-error-message">{formInputErrorMessage}</span>}
            </Form.Group>
            <Button type="submit" onClick={() => onSubmit()}>Verify</Button>
        </div>
    </div>
  );
}

export default App;
