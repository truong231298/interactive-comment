import React, { useState } from "react";
import datas from "./data.json";

import Reply from "./components/reply";
import Comment from "./components/comment";
import Usercomment from "./components/usercomment";


const App = () => {

  const [commentStates, setCommentStates] = useState(
    datas.comments.flatMap(comment => [
      { id: comment.id, type: "comment", score: comment.score},
      ...comment.replies.map(reply => ({ id: reply.id, type: "reply", score: reply.score})),
    ])
  );

  return (
    <main className="min-h-screen flex justify-center items-center bg-Lightgray">
      <section className="sm:max-w-2xl mx-4">
        {datas.comments.map(data => (
          <Comment key={data.id} 
          data={data} 
          setCommentStates={setCommentStates} 
          />
        ))}
        {datas.comments.flatMap(data => (
          data.replies.map(reply => <Reply key={reply.id} 
            reply={reply} 
            setCommentStates={setCommentStates} 
            />)
        ))}
        <Usercomment/>
      </section>
    </main>
  );
};

export default App;
