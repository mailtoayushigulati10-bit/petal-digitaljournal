import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function VerifyOTP(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");

  const [otp,setOtp] = useState("");

  const verifyOTP = async(e)=>{

    e.preventDefault();

    try{

      const res = await API.post(
        "/auth/verify",
        {
          email,
          otp
        }
      );

      alert(res.data.message);

      navigate("/login");

    }catch(err){

      alert(
        err.response?.data?.message
      );

    }

  }

  return(

    <div className="auth-container">

      <form
      onSubmit={verifyOTP}
      className="auth-card"
      >

        <h1>Verify OTP 🌸</h1>

        <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e)=>
        setEmail(e.target.value)}
        />

        <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e)=>
        setOtp(e.target.value)}
        />

        <button type="submit">
          Verify
        </button>

      </form>

    </div>

  )

}