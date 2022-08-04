import {Header} from "./components/Header";
import {Sidebar} from "./components/Sidebar";

import "./global.css";

import styles from "./App.module.css";
import {Post, PostProps} from "./components/Post";

const posts: PostProps[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @ Rocketseat'
    },
    content: [
      {
        type: 'paragraph',
        content: "Fala galeraa 👋"
      },
      {
        type: 'paragraph',
        content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"
      },
      {
        type: 'link',
        content: 'jane.design/doctorcare',
      }
    ],
    publishedAt: new Date('2020-04-01T03:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/enosads.png',
      name: 'Enos Andrade',
      role: 'Software Engineer'
    },
    content: [
      {
        type: 'paragraph',
        content: "Fala galeraa 👋"
      },
      {
        type: 'paragraph',
        content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"
      },
      {
        type: 'link',
        content: 'jane.design/doctorcare',
      }
    ],
    publishedAt: new Date("2022-06-01T03:19:00"),
  },
];

export function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              author={post.author}
              content={post.content}
              id={post.id}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  );
}