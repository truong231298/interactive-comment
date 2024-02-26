import React, { useState } from "react";
import datas from "./data.json";
import iconPlus from "/images/icon-plus.svg";
import iconMinus from "/images/icon-minus.svg";
import iconReply from "/images/icon-reply.svg";


const ScoreControl = ({ id, score, onClick }) => (
  <div className="p-2 flex sm:flex-col w-24 sm:w-12 items-center gap-4 bg-Lightgray rounded-lg">
    <img src={iconPlus} alt="" onClick={() => onClick(id, 1)} className="cursor-pointer"/>
    <span className="text-Darkblue font-semibold">{score}</span>
    <img src={iconMinus} alt="" onClick={() => onClick(id, -1)} className="cursor-pointer"/>
  </div>
);


const handleScoreChange = (id, delta, setCommentStates) => {

  const updatedStates = setCommentStates((prevStates) =>
    prevStates.map((state) =>
      state.id === id ? { ...state, score: Math.max(state.score + delta, 0) } : state

    )
  ); 
  console.log('Updated States:', updatedStates);
  return updatedStates;
 
};



const Comment = ({ data, setCommentStates, handleReply }) => (
  <div key={data.id} className="flex flex-col-reverse sm:flex-row gap-4 mb-2 bg-White p-4 rounded-md">
    <div className="flex justify-between items-center">
      <ScoreControl id={data.id} score={data.score} onClick={(id, delta) => handleScoreChange(id, delta, setCommentStates)} />
      <span className="flex gap-1 sm:hidden">
        <img src={iconReply} alt="" className="w-5 p-1"/>
        <p className="font-semibold text-blue-600" onClick={()=> handleReply(data.id)}>Reply</p>
        
      </span>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2">
          <img src={data.user.image.png} alt="" className="w-10" />
          <h1 className="text-Darkblue font-medium">{data.user.username}</h1>
          <p className="text-gray-500">{data.createdAt}</p>
        </span>
        <span className="hidden sm:flex gap-1">
          <img src={iconReply} alt="" className="w-5 p-1" />
          <p className="font-semibold text-blue-600 cursor-pointer hover:text-Lightgrayishblue">Reply</p>
        </span>
      </div>
      <p className="text-gray-500">{data.content}</p>
    </div>
  </div>
);

const Reply = ({ reply, setCommentStates, handleReply }) => (
  <div key={reply.id} className="ml-8 p-4">
    <div className="flex flex-col-reverse sm:flex-row gap-4 mb-2 bg-White p-4 rounded-md">
      <div className="flex justify-between items-center">
        <ScoreControl id={reply.id} score={reply.score} onClick={(id, delta) => handleScoreChange(id, delta, setCommentStates)} />
        <span className="flex gap-1 sm:hidden" >
          <img src={iconReply} alt="" className="w-5 p-1" />
          <p className="font-semibold text-blue-600" onClick={()=> handleReply(reply.id)}>Reply</p>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center bg-white">
          <span className="flex items-center gap-2">
            <img src={reply.user.image.png} alt="" className="w-10" />
            <h1 className="text-Darkblue font-medium">{reply.user.username}</h1>
            <p className="text-gray-500">{reply.createdAt}</p>
          </span>
          <span className="hidden sm:flex gap-1">
            <img src={iconReply} alt="" className="w-5 p-1" />
            <p className="font-semibold text-blue-600 cursor-pointer hover:text-Lightgrayishblue">Reply</p>
          </span>
        </div>
        <p className="text-gray-500">{reply.content}</p>
      </div>
    </div>
  </div>
);

//reply when click
const handleReply = (id) => {
  const reply =  setCommentStates((prevStates) =>
    prevStates.map((state) =>
      state.id === id ? { ...state, isReplyVisible: !state.isReplyVisible } : state
    )
  );
  console.log(reply)
};


const App = () => {

  const [commentStates, setCommentStates] = useState(
    datas.comments.flatMap(comment => [
      { id: comment.id, type: "comment", score: comment.score, isReplyVisible: false },
      ...comment.replies.map(reply => ({ id: reply.id, type: "reply", score: reply.score, isReplyVisible: false })),
    ])
  );

  return (
    <main className="min-h-screen flex justify-center items-center bg-Lightgray">
      <section className="sm:max-w-2xl mx-4">
        {datas.comments.map(data => (
          <Comment key={data.id} 
          data={data} 
          setCommentStates={setCommentStates} 
          handleReply={handleReply}/>
        ))}
        {datas.comments.flatMap(data => (
          data.replies.map(reply => <Reply key={reply.id} 
            reply={reply} 
            setCommentStates={setCommentStates} 
            handleReply={handleReply}/>)
        ))}
        <div className="flex gap-2 bg-White p-4 rounded-lg">
          <img src={datas.currentUser.image.png} alt="" className="w-10 h-10" />
          <textarea className="rounded-lg w-full h-20 bg-Lightgrayishblue" placeholder="Add a comment..."></textarea>
          <button className="bg-blue-800 border-gray-500 h-10 px-4 rounded-lg text-white hover:bg-Lightgrayishblue">SEND</button>
        </div>
      </section>
    </main>
  );
};

export default App;
