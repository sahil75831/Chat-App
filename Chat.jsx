import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import css from "./Styles/AuthUserChatt.module.scss";

import { FaSignOutAlt } from "react-icons/fa";
import { AiOutlineSend } from 'react-icons/ai'
const cookies = new Cookies();

const Chat = (props) => {
  const [newMessage, setNewMessage] = useState();
  const [allMessage, setAllMessage] = useState([]);
  const [s, ss] = useState();
  const messageRef = collection(db, "messages");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messageRef, {
      messageText: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: props.room,
      uid: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
    });
    setNewMessage("");
    console.log("auth.currentUser", auth.currentUser);
    console.log("auth.currentUser.uid", auth.currentUser.uid);
  };

  useEffect(() => {
    const queryMmessagesRef = query(
      messageRef,
      where("room", "==", props.room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMmessagesRef, (snap) => {
      let messagesArray = [];
      snap.forEach((doc) => {
        messagesArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(messagesArray);
      setAllMessage([...messagesArray]);
    });
    return () => {
      unsubscribe();
      // basically cleaning up useEffect cleanup function: It is a function of the useEffect hook that allows us to stop side effects that no longer need to be executed before our component is unmounted. useEffect is built in such a way that we can return a function inside it and this return function is where the cleanup happens.
    };
  }, []);

  return (
    <div className={`${css.wrapper1}`}>
      <div className={`${css.container}`}>
        <div className={`${css.header}`}>
          <h1> Sahil Chat App</h1>
        </div>
        <div className={`${css.chat_section_box}`}>
          {allMessage.map((e, i) => {
            return (
              <div
                className={`${
                  e.uid.includes(auth.currentUser.uid)
                    ? css.chat_section
                    : css.chat_sectionn
                }`}
              >
                <div className={`${css.userarea}`}>
                  <span> {e.user} </span>
                  <p style={{ s }}> {e.messageText} </p>
                </div>
                {/* <br></br> */}
                {/* <hr /> */}
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className={`${css.form_field}`}>
          <input
            type="text"
            className={`${css.form_input_field}`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="type your message here..."
          />
          
          {/* <div className={`${css.send_butt}`}>
          </div> */}

          {/* <div> */}
          <button type="submit">
            <div className={`${css.send_butt}`}>
              <div> <AiOutlineSend /> </div>
              <div>Send</div>
            </div>
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default Chat;
