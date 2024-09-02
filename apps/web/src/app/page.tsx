/* eslint-disable react-hooks/exhaustive-deps */

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

const SOCKET_SERVER_URL = "http://localhost:4000"

type Message = {
  user: string
  text: string
  room: string
}

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [socket, setSocket] = useState<Socket | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [room, setRoom] = useState("global")
  const [newRoom, setNewRoom] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL)
    setSocket(newSocket)

    newSocket.on("user joined", (username: string) => {
      setUsername(username)
      newSocket.emit("join room", "global")
    })

    newSocket.on(
      "chat message",
      ({ username, message }: { username: string; message: string }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: username, text: message, room },
        ])
      },
    )

    newSocket.on("room joined", (joinedRoom: string) => {
      setRoom(joinedRoom)
      setMessages([])
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (socket && username && room && inputMessage) {
      const data = { username, room, message: inputMessage }
      socket.emit("chat message", data)
      setInputMessage("")
    }
  }

  const handleJoinRoom = () => {
    if (socket && newRoom) {
      socket.emit("join room", newRoom)
      setRoom(newRoom)
      setMessages([])
      setNewRoom("")
    }
  }

  if (!username) {
    return (
      <div className="flex h-screen items-center justify-center">
        Connecting...
      </div>
    )
  }

  return (
    <Card className="mx-auto mt-4 w-full max-w-xl">
      <CardHeader>
        <CardTitle>Chat Room</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-muted-foreground text-sm">
            Chatting as: {username} | Room: {room}
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              placeholder="Enter room name"
            />
            <Button onClick={handleJoinRoom}>Join Room</Button>
          </div>
          <ScrollArea
            className="h-min rounded-md border p-4"
            ref={scrollAreaRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 rounded-md p-2 ${
                  msg.user === username
                    ? "bg-primary text-primary-foreground ml-auto w-3/4"
                    : "bg-muted w-3/4"
                }`}
              >
                <div className="font-bold">{msg.user}</div>
                <div>{msg.text}</div>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
