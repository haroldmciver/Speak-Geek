import { Link } from "react-router-dom"; // Import the Link component
import { useState } from "react"
import { getAuth, signOut } from 'firebase/auth';



export default function LogOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
        window.location.href = "/";
    }).catch((error) => {
        console.log(error);
    });
    // return ();
}