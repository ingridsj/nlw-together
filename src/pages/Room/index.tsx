import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import styles from "./styles.module.scss";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");

  const params = useParams<RoomParams>();
  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`);

    roomRef.on("value", (room) => {
      //olhar outros eventos do firebase que comporte melhor performatividade
      //do que esse, já que esse recarrega TODOS os dados do banco de dados,
      //e quero apenas que recarregue o que MUDOU

      const databaseRoom = room.val();

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

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
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length > 1
                ? `${questions.length} perguntas`
                : `${questions.length} pergunta`}
            </span>
          )}
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
