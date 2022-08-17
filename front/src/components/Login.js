import React, {useState} from 'react';
import Input from "./Input";
import Form from "./Form";

function Login({onSubmit}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return
        }
        onSubmit(email, password)
    }

    return (<Form
        name='auth'
        title='Вход'
        submitButtonText="Войти"
        onSubmit={handleSubmit}
    >
        <Input value={email} name="email" onChange={handleEmailChange} type="email" placeholder="Email" maxLength="30" minLength="2" mode="dark"/>
        <Input value={password} name="password" onChange={handlePasswordChange} type="password" placeholder="Пароль" maxLength="30" minLength="2"mode="dark"/>
    </Form>)
}

export default Login;