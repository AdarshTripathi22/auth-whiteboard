import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import { sendPasswordResetEmail } from 'firebase/auth'

const ForgotPassword = () => {
    const emailRef = useRef();
    const { setTimeActive } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const [Loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await sendPasswordResetEmail(auth, emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Password Reset </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group> 
                    <Button disabled = {Loading} type = "submit" className = "w-100 mt-3">
                        Reset Password
                    </Button>
                </Form>
                <div className = "w-100 text-center mt-3">
                    <Link to="/login">Log In</Link> 
                </div>
            </Card.Body>
        </Card>
        <div className = "w-100 text-center mt-2">
            Need an Account? <Link to="/signup">Sign Up</Link> 
        </div>
    </>
  )
}

export default ForgotPassword