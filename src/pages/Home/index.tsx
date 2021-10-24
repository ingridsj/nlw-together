import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../../components/Button";
import { SideAuth } from "../../components/SideAuth";

import { useAuth } from "../../hooks/useAuth";

import { database } from "../../services/firebase";

import { logoImg, googleIconImg } from "../../assets/images/exports";

import styles from "./styles.module.scss";

export function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  const history = useHistory();

  async function handleCreateNewRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div className={styles.pageAuth}>
      <SideAuth />
      <main>
        <div className={styles.mainContent}>
          <img src={logoImg} alt="Letmeask" />
          <button className={styles.createRoom} onClick={handleCreateNewRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className={styles.separator}>ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
