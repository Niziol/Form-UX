import { useState } from 'react';

const useInput = (validate) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validate(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const blurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		blurHandler,
    reset
	};
};

export default useInput;
