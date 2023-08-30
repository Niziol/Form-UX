import useInput from '../hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';

const validateEmail = (value) => {
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(value);
};

const BasicForm = (props) => {
	const {
		value: enteredFirstName,
		isValid: firstNameInputIsValid,
		hasError: firstNameInputHasError,
		valueChangeHandler: firstNameInputChangeHandler,
		blurHandler: firstNameInputBlurHandler,
		reset: firstNameInputReset,
	} = useInput(isNotEmpty);

	const {
		value: enteredLastName,
		isValid: lastNameInputIsValid,
		hasError: lastNameInputHasError,
		valueChangeHandler: lastNameInputChangeHandler,
		blurHandler: lastNameInputBlurHandler,
		reset: lastNameInputReset,
	} = useInput(isNotEmpty);

	const {
		value: enteredEmail,
		isValid: emailInputIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailInputChangeHandler,
		blurHandler: emailInputBlurHandler,
		reset: emailInputReset,
	} = useInput(validateEmail);

	const formIsValid =
		firstNameInputIsValid && lastNameInputIsValid & emailInputIsValid;

	const submitFormHandler = (e) => {
		e.preventDefault();

		if (!formIsValid) {
			console.log("Don't play with Dev tools buddy :P");
			return;
		}

		emailInputReset();
		firstNameInputReset();
		lastNameInputReset();
	};

	const firstNameClasses = !firstNameInputHasError
		? 'form-control'
		: 'form-control invalid';

	const lastNameClasses = !lastNameInputHasError
		? 'form-control'
		: 'form-control invalid';

	const emailClasses = !emailInputHasError
		? 'form-control'
		: 'form-control invalid';

	return (
		<form onSubmit={submitFormHandler}>
			<div className="control-group">
				<div className={firstNameClasses}>
					<label htmlFor="name">First Name</label>
					<input
						type="text"
						id="name"
						onChange={firstNameInputChangeHandler}
						onBlur={firstNameInputBlurHandler}
						value={enteredFirstName}
					/>
					{firstNameInputHasError && (
						<p className="error-text">You must enter correct first name.</p>
					)}
				</div>
				<div className={lastNameClasses}>
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						onChange={lastNameInputChangeHandler}
						onBlur={lastNameInputBlurHandler}
						value={enteredLastName}
					/>
					{lastNameInputHasError && (
						<p className="error-text">You must enter correct last name.</p>
					)}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor="email">E-Mail Address</label>
				<input
					type="email"
					id="email"
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
					value={enteredEmail}
				/>
				{emailInputHasError && (
					<p className="error-text">You must enter correct email.</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
