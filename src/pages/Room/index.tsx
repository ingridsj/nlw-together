import { FormEvent, useState } from "react";
import { useParams } from "react-router";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import styles from "./styles.module.scss";

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div className={styles.pageRoom}>
      <Header roomId={roomId} />

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className={styles.formFooter}>
            {user ? (
              <div className={styles.userInfo}>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça o seu login.</button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
