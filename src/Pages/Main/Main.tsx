import React, { useState } from "react";
import "./Main.scss";
import LOGOMARK from "../../assets/images/logo-mark.svg";
import DragAndDropUpload from "../../Components/DragAndDropUpload/DragAndDropUpload";
import { PiWarningCircleLight } from "react-icons/pi";
import Ticket from "../../Components/Ticket/Ticket";

function Main() {
  // State to hold form inputs
  const [formData, setFormData] = useState({
    avatar: null,
    fullName: "",
    email: "",
    githubUsername: "",
  });

  // State to track if the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State for error messages
  const [errors, setErrors] = useState({
    avatar: "",
    fullName: "",
    email: "",
    githubUsername: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: { avatar: null; fullName: string; email: string; githubUsername: string; }) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear any error related to that input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle avatar upload
  const handleAvatarUpload = (file: any) => {
    setFormData((prevData) => ({
      ...prevData,
      avatar: file, // Save the uploaded file in formData
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      avatar: "", // Clear any avatar error
    }));
  };

  // Validate email
  const isEmailValid = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for errors
    const newErrors: any = {};

    if (!formData.avatar) newErrors.avatar = "Avatar is required.";
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!isEmailValid(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.githubUsername) newErrors.githubUsername = "GitHub Username is required.";

    // If there are errors, do not submit the form
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // No errors, mark the form as submitted
    setIsSubmitted(true);
  };

  return (
    <div className="main">
      {!isSubmitted ? (
        <div className="container">
          <div className="title">
            <img src={LOGOMARK} alt="logoMark" className="logoMark" />
            <div className="titleDesc">Coding Conf</div>
          </div>
          <div className="mainTitle">
            <h1>Your Journey To Coding Conf</h1>
            <h1>2025 Starts Here!</h1>
          </div>
          <div className="text">
            Secure Your Spot at next year's biggest coding conference
          </div>
          <div className="formContainer">
            <form onSubmit={handleSubmit} className="form">
              <div className="form_inputbox">
                <div className="form_label">Upload Avatar</div>
                <DragAndDropUpload onUpload={handleAvatarUpload} />
                {errors.avatar && <div className="error-text">{errors.avatar}</div>}
                <div className="warningText">
                  <PiWarningCircleLight />
                  <span>Upload your photo (JPG or PNG, max-size: 500KB)</span>
                </div>
              </div>
              <div className="form_inputbox">
                <div className="form_label">Full Name</div>
                <input
                  className={`input ${errors.fullName ? "input-error" : ""}`}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                />
                {errors.fullName && <div className="error-text">{errors.fullName}</div>}
              </div>
              <div className="form_inputbox">
                <div className="form_label">Email Address</div>
                <input
                  className={`input ${errors.email ? "input-error" : ""}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@domain.com"
                />
                {errors.email && <div className="error-text">{errors.email}</div>}
              </div>

              <div className="form_inputbox">
                <div className="form_label">Github Username</div>
                <input
                  className={`input ${errors.githubUsername ? "input-error" : ""}`}
                  type="text"
                  name="githubUsername"
                  value={formData.githubUsername}
                  onChange={handleInputChange}
                  placeholder="@yourusername"
                />
                {errors.githubUsername && <div className="error-text">{errors.githubUsername}</div>}
              </div>
              <button className="submit_btn" type="submit">
                Generate My Ticket
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Ticket formData={formData} />
      )}
    </div>
  );
}

export default Main;
