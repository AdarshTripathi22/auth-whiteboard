import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { updateProfile } from 'firebase/auth'
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const UpdateProfile = () => {
    const nameRef = useRef();
    const profilePicRef = useRef();
    const [url, setUrl] = useState(null);
    const { currentUser, setTimeActive } = useAuth();
    const [image, setImage] = useState(null)
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [Loading, setLoading] = useState(false);
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        // const imageRef = ref(storage, "image");
        // uploadBytes(imageRef, image)
        // .then(() => {
        //     getDownloadURL(imageRef)
        //     .then((url) => {
        //         setUrl(url);
        //     })
        //     .catch((error) => {
        //         console.log(error.message, "error getting the image url");
        //     });
        //     setImage(null);
        // })
        // .catch((error) => {
        //     console.log(error.message);
        // });


        try {
            setError('')
            setLoading(true)
            console.log("yes here")
            await updateProfile(auth.currentUser, { displayName: nameRef.current.value })
            if(profilePicRef.current.value !== null) {await updateProfile(auth.currentUser, { photoURL: profilePicRef.current.value })}
            setMessage("Updated Successfully Redirecting.... to Login Page")
            const x = setTimeout(async ()=> {
                await auth.signOut()
                history('/login')
            }, 2500)
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    // function handleImageChange(e) {
    //     console.log(e.target.files[0])
    //     if(e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     }
    //     console.log(image)
    // }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Profile </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Profile Pic Url</Form.Label>
                        <Form.Control type="text" ref={profilePicRef} />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group> 
                    <Button disabled = {Loading} type = "submit" className = "w-100 mt-3">
                        Update Profile
                    </Button>
                </Form>
                <div className = "w-100 text-center mt-3">
                    <Link to="/">DashBoard</Link> 
                </div>
            </Card.Body>
        </Card>
        {/* <div className = "w-100 text-center mt-2">
            Need an Account? <Link to="/signup">Sign Up</Link> 
        </div> */}
    </>
  )
}

export default UpdateProfile