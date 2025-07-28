import { useState } from "react";
import PropTypes from "prop-types";
import useLogin from "../hooks/useLogin";
import useSignup from "../hooks/useSignup";
import { IoMdClose } from "react-icons/io";
import InputBox from "../Components/InputBox";
import { IoMail } from "react-icons/io5";
import Button from "../Components/Button";
import { FaLock, FaUser } from "react-icons/fa";

function LoginSignup({ showModal, onClose }) {
  // Clear state and errors when toggling between Login and Signup
  const handleToggle = (newState) => {
    setState(newState);
    setError("");
    setSuccess("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const [state, setState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login, loading: loginLoading } = useLogin();
  const { signup, loading: signupLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (state === "Login") {
      try {
        await login(email, password);
        setSuccess("Login successful!");
        // Clear form fields
        setEmail("");
        setPassword("");
        // Close modal after a short delay to show success message
        setTimeout(() => {
          onClose();
        }, 1000);
      } catch (err) {
        setError(err.message || "Login failed");
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        await signup(username, email, password, confirmPassword);
        setSuccess("Signup successful!");
        // Clear form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // Close modal after a short delay to show success message
        setTimeout(() => {
          onClose();
        }, 1000);
      } catch (err) {
        setError(err.message || "Signup failed");
      }
    }
  };
  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 w-screen  bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
        <form className="w-1/3 flex flex-col bg-white" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-center py-2">{error}</div>}
          {success && <div className="text-green-500 text-center py-2">{success}</div>}
          {(loginLoading || signupLoading) && <div className="text-center py-2">Loading...</div>}
          <IoMdClose
            onClick={onClose}
            className="place-self-end text-3xl font-bold m-2 hover:drop-shadow-lg hover:cursor-pointer text-primarycolor"
          />
          <div className="">
            <h1 className="font-semibold text-black text-4xl text-center">
              {state === "Login" ? (
                <>
                  Log<span className="text-primarycolor">in</span>
                </>
              ) : (
                <>
                  Sign<span className="text-primarycolor">Up</span>
                </>
              )}
            </h1>

            <div className="mt-8">
              <InputBox
                placeholder="Enter your username"
                Icon={FaUser}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                />
              <InputBox
                placeholder="Enter your email"
                Icon={IoMail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                />
              <InputBox
                type="password"
                placeholder={state === "Login" ? "Password" : "Set password"}
                Icon={FaLock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {state === "Signup" && (
                <>
                  <InputBox
                    type="password"
                    placeholder="Confirm password"
                    Icon={FaLock}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </>
              )}
            </div>
            {state === "Login" && (
              <p className="text-center text-black">
                Forgot password?{" "}
                <a href="#" className="text-primarycolor">
                  Click Here
                </a>
              </p>
            )}
          </div>
          <div className="flex justify-evenly py-4">
            <Button type="submit" className="py-2 px-11 rounded-3xl">
              {state === "Login" ? "Login" : "Signup"}
            </Button>
            <Button
              type="button"
              onClick={() => handleToggle(state === "Login" ? "Signup" : "Login")}
              className="py-2 px-9 rounded-3xl font-semibold "
              bg="bg-gray-300"
              txt="text-black"
            >
              {state === "Signup" ? "Login" : "Signup"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginSignup;

LoginSignup.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
