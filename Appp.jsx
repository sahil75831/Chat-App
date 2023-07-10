import React, { useRef, useState } from "react";
import AuthUserChat from "./AuthUserChat";
import Cookies from "universal-cookie";
import Chat from "./Chat";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import css from "./Styles/Appp.module.scss";
import { FaSignOutAlt } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
const cookies = new Cookies();
const Appp = () => {
  const roomRef = useRef();
  const [authentication, setAuthentication] = useState(
    cookies.get("token-chat-application")
  );
  const [room, setRoom] = useState(null);
  const signout = async (e) => {
    await signOut(auth);
    cookies.remove("token-chat-application");
    setRoom(null);
    setAuthentication(false);
  };
  if (!authentication) {
    return (
      <div>
        <AuthUserChat setAuthentication={setAuthentication} />
      </div>
    );
  }
  return (
    <div className={`${css.container}`}>
      {room ? (
        <div>
          <Chat
            room={room}
            setroom={setRoom}
            setAuthentication={setAuthentication}
          />
        </div>
      ) : (
        <div className={`${css.wrapper}`}>
          <input
            type="text"
            placeholder="enter room name.."
            ref={roomRef}
            className={`${css.inputAppp}`}
          />
          <button
            className={css.signOut_button}
            onClick={() => {
              return setRoom(roomRef.current.value);
            }}
          >
            <div className={`${css.green_button}`}>
              <div>
                <AiFillWechat />
              </div>
              <div>Enter Chat</div>
            </div>
          </button>
        </div>
      )}
      <button onClick={signout} className={css.signOut_button}>
        <div className={`${css.blue_button}`}>
          <div>
            <FaSignOutAlt />
          </div>
          <div>Sign out</div>
        </div>
      </button>
    </div>
  );
};

export default Appp;
