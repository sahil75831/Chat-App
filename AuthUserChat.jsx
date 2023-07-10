import React from "react";
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import css from "./Styles/Auth.module.scss";
const cookies = new Cookies();
const AuthUserChat = (props) => {
  const sign_in_with_google = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      cookies.set("token-chat-application", response.user.refreshToken);
      props.setAuthentication(true);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className={`${css.signinwithgoogle}`}>
      <p style={{fontSize:"35px", color:"black"}}>sign in with google to continue</p>
      <button  onClick={sign_in_with_google}>
      <div>
      <div className={`${css.send_butt}`}>
        <div>
          G
        </div>
        <div>sign in with google</div>
      </div>
    </div>
        
      </button>
    </div>
  );
};

export default AuthUserChat;
