import React from "react"
import "./App.css"
import Auth from "./components/Auth"
import Cookies from "universal-cookie"

const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = React.useState(cookies.get("auth-token"))
  const [room, setRoom] = React.useState(null)

  const roomInpRef = React.useRef(null)

  if (!isAuth) {
    return (
      <div className="App">
        <Auth />
      </div>
    )
  }
  return (
    <div>
      {room ? (
        <div>chat </div>
      ) : (
        <div className="room">
          <label htmlFor="room">Enter Room Name</label>
          <input ref={roomInpRef} type="text" />
          <button onClick={() => setRoom(roomInpRef.current.value)}>
            Create Room
          </button>
        </div>
      )}
    </div>
  )
}

export default App
