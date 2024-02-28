import React from 'react'
import datas from "../data.json"
import { useState } from 'react'
import ScoreControl from './ScoreControl'
import iconReply from "/images/icon-reply.svg";

const Usercomment = () => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleSendClick = () => {
        // Add a new comment to the array
        setComments(prevComments => [
            ...prevComments,
            {
                user: datas.currentUser,
                text: newComment,
                timestamp: new Date().toLocaleTimeString(),
            }
        ]);

        // Clear the input field after adding a comment
        setNewComment('');
    };

    return (
        <>
            {comments.map((Comment, index) => (
                <div key={index} className="flex flex-col-reverse sm:flex-row gap-2 bg-White  ml-8 my-2 p-4 rounded-lg">
                    <ScoreControl id={0} score={0}/>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row gap-2'>
                            <img src={Comment.user.image.png} alt="" className="w-10 h-10" />
                            <h1 className="text-Darkblue font-medium">{Comment.username}</h1>
                            <span className='text-white bg-blue-500 rounded-lg px-2'>you</span>
                            <p className="text-gray-500">{Comment.timestamp}</p>
                        </div>
                        <p className='p-4 rounded-lg'>{Comment.text}</p>
                    </div>
                    <span className="flex gap-1 sm:hidden">
                        <img src={iconReply} alt="" className="w-5 p-1" />
                        <p className="font-semibold text-blue-600" onClick={() => setIsreply(true)}>Reply</p>

                    </span>
                </div>
            ))}


            <div className="flex gap-2 bg-White p-4 rounded-lg">
                <img src={datas.currentUser.image.png} alt="" className="w-10 h-10" />
                <textarea className="rounded-lg w-full h-20 bg-Lightgrayishblue"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}></textarea>
                <button className="bg-blue-800 border-gray-500 h-10 px-4 rounded-lg text-white hover:bg-Lightgrayishblue" onClick={handleSendClick}>SEND</button>
            </div>
        </>

    )
}

export default Usercomment