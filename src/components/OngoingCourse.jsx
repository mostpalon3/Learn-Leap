import React from 'react'
import { OngoingProgressBar } from './OngoingProgress'

const OngoingCourse = ({course,topic,percentage,image}) => {
  return (
    <div className="border-[0.1px] border-gray-300 w-full h-[8dvh] mt-[1.5dvh] rounded-2xl flex items-center">
    <img
      src={image}
      alt="React"
      className="w-[3dvw] h=[3dvw] m-[1dvw]"
    />
    <div className="flex flex-col justify-center items-start">
      <h1 className="text-[1dvw]">{course}</h1>
      <span className="text-[0.6dvw] text-gray-400">
        {topic}
      </span>
    </div>
    <span className='ml-[4dvw]'>
    <OngoingProgressBar percentage={percentage}/>
    </span>
  </div>
  )
}

export default OngoingCourse
