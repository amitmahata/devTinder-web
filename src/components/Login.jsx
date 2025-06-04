import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId: emailId,
                    password: password
                },
                {
                    withCredentials: true
                });

            dispatch(addUser(res.data));
            return navigate("/");
        } catch (error) {
            setError(error.response.data || "Something went wrong");
            console.log(error);
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true });

            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (error) {
            setError(error.response.data || "Something went wrong");
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Sign Up"}</h2>
                    <div>
                        {!isLoginForm && (
                            <>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </>
                        )}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input
                                type="text"
                                value={emailId}
                                className="input"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="password"
                                value={password}
                                className="input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <p className="text-error">{error}</p>
                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignup}>
                            {isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className="text-center cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm
                            ? "New User? Signup here"
                            : "Existing User? Login here"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login