import { logoImg } from "../../assets/images/exports";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

import styles from "./styles.module.scss";

export function Room() {
  return (
    <div className={styles.pageRoom}>
      <Header />

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que você quer perguntar?" />

          <div className={styles.formFooter}>
            <span>
              Para enviar uma pergunta, <button>faça o seu login.</button>
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
