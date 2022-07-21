import styles from './Comment.module.css';
import {ThumbsUp, Trash} from "phosphor-react";
import {Avatar} from "./Avatar";
import {useState} from "react";

interface CommentProps {
  content: string;
  onDelete: (comment: string) => void;
}

export function Comment({content, onDeleteComment}:CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content);
  }

  function handleLikeComment(){
    setLikeCount((likeCount) => likeCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar
        src="https://github.com/enosads.png"
        hasBorder={false}
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Enos Andrade</strong>
              <time
                title="7 de Junho às 20:51"
                dateTime={"2022-06-07 20:51"}
              >
                Cerca de 2h atrás
              </time>
            </div>
            <button
              title='Deletar comentário'
              onClick={handleDeleteComment}
            >
              <Trash size={24}/>
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp/>
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}