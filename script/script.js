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
passwordEyeToggle(passwordInput, eyeIcon)

function passwordEyeToggle(inputElement, iconElement){
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
if(cancelErrorContainer){
    cancelErrorContainer.addEventListener("click", ()=>{
        errorContainer.classList.remove("showerrorcontainer");

    });
}
document.addEventListener("input", ()=>{
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
            console.log("login Successfully")
        }

    });
}
