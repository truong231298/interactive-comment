import React from 'react'
import iconPlus from "/images/icon-plus.svg";
import iconMinus from "/images/icon-minus.svg";
import { useState } from 'react';

const ScoreControl = ({ score }) => {
    const [initScore, setInitScore] = useState(score);

    const changeScore = (delta) =>{
        if((initScore + delta) >= 0){
            setInitScore(initScore + delta);
        }
        
    }

    return (
        <div className="p-2 flex sm:flex-col w-24 sm:w-12 items-center gap-4 bg-Lightgray rounded-lg">
            <img src={iconPlus} alt="" onClick={()=> changeScore(1)} className="cursor-pointer" />
            <span className="text-Darkblue font-semibold">{initScore}</span>
            <img src={iconMinus} alt="" onClick={() => changeScore(-1)} className="cursor-pointer" />
        </div>
    )
}

export default ScoreControl
