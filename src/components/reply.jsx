import React from 'react'
import iconReply from "/images/icon-reply.svg"; 
import ScoreControl from './ScoreControl';
import { useState } from 'react';
import Usercomment from './usercomment';

const Reply = ({ reply, setCommentStates, handleReply }) => {
    //make click reply
    const [isreply, setIsreply] = useState(false)
    

    return (
        <div key={reply.id} className="ml-8 p-4">
            <div className="flex flex-col-reverse sm:flex-row gap-4 mb-2 bg-White p-4 rounded-md">
                <div className="flex justify-between items-center">
                    <ScoreControl id={reply.id} score={reply.score} onClick={(id, delta) => handleScoreChange(id, delta, setCommentStates)} />
                    <span className="flex gap-1 sm:hidden" >
                        <img src={iconReply} alt="" className="w-5 p-1" />
                        <p className="font-semibold text-blue-600" onClick={()=> setIsreply(true)}>Reply</p>
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
                            <p className="font-semibold text-blue-600 cursor-pointer hover:text-Lightgrayishblue" onClick={()=> setIsreply(true)}>Reply</p>
                        </span>
                    </div>
                    <p className="text-gray-500">{reply.content}</p>
                </div>
               
            </div>
            {isreply ? <Usercomment/> : ""}
        </div>
    )
}

export default Reply