console.clear()


$(()=>{
    const signUp = $('#signup');
    const formTitle = $('#title');
    const login = $('#login')
    const form = $('#form')

    signUp.click(()=>{
        if(signUp.get(0).innerText == 'Sign Up ?.'){
            formTitle.text('Sign Up')
            signUp.text('Login .')
            login.attr({value: 'Sign Up'})
        }
        else {
            formTitle.text('Sign In')
            signUp.text('Sign Up ?.')
            login.attr({value: 'Login'})
        }
    })

    form.on({
        submit : (e)=>{
            e.preventDefault();
            const event = e.target
            if(event.submit.value == 'Login'){
                let localName = window.localStorage.getItem('finalUserName')
                let localPass = window.localStorage.getItem('finalPassword')
                if(event.username.value == localName && event.password.value==localPass){
                    alert('Login Successful')
                    window.location.assign('/2-OrderPage/order.html')
                }
                else {
                    alert('Please enter valid credentials!')
                }
            }
            else {
                console.log(login.get(0).innerText)
                window.localStorage.setItem('finalUserName', event.username.value)
                window.localStorage.setItem('finalPassword', event.password.value)
                alert('Please Remember Your Credentials')
                window.location.assign('/2-OrderPage/order.html')
            }
        }
    })
})