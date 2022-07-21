import styles from './Post.module.css';
import {Comment} from "./Comment";
import {Avatar} from "./Avatar";
import {format, formatDistanceToNow} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {ChangeEvent, FormEvent, InvalidEvent, useState} from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  id: number;
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export function Post({author, content, publishedAt}: PostProps) {
  const [comments, setComments] = useState([
    "Post muito bacana, hein?!",
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const publishedAtFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {locale: ptBR}
  );
  const publishedDateRelativeToNow = formatDistanceToNow(
    publishedAt,
    {
      locale: ptBR,
      addSuffix: true
    });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  function deleteComment(content: string) {
    setComments(comments.filter(comment => comment !== content));
  }

  const isNewCommentEmpty = newCommentText.trim().length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedAtFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map(({type, content}) => {
          if (type === 'paragraph') {
            return <p key={content}>{content}</p>
          } else if (type === 'link') {
            return <p key={content}><a href="#">{content}</a></p>
          }
        })}
      </div>
      <form
        className={styles.commentForm}
        onSubmit={handleCreateNewComment}
      >
        <strong>Deixe seu feedback</strong>
        <textarea
          name={'comment'}
          placeholder="Escreva um comentário..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button
            type='submit'
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}