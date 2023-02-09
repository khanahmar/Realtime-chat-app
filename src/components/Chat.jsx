import React from "react"
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore"
import { async } from "@firebase/util"
import { auth, db } from "../firebase-config"

const Chat = (props) => {
  const [newMessage, setNewMessage] = React.useState("")
  const messageRef = collection(db, "messages")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newMessage === "") return
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      room: props.room,
      user: auth.currentUser.displayName,
    })
    setNewMessage("")
  }

  React.useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", props.room))
    onSnapshot(queryMessages, (snapshot) => {
      console.log("New messsage")
    })
  }, [])

  return (
    <div className="chat-app">
      <form onSubmit={handleSubmit} className="new-message-from">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          className="new-message-input"
          placeholder="Enter a message"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  )
}

export default Chat
