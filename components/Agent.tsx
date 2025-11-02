// import Image from 'next/image'
// import React from 'react'

// const Agent = ({userName}:AgentProps) => {
//     const isSpeaking = true;

//   return (
//     <>
//     <div className='call-view '>
//      <div className='card-interviewer'>
// <div className='avatar'>
    
//     <Image src="/logo1.png" alt="vapi" width={50} height={50} className='object-cover' />
//  {isSpeaking && <span className='animate-speak'/>}
// <br/>
//  <h3> AI Interviewer</h3>
// </div>
// </div>


// <div className='card-border'>
//     <div className='card-content'>

//         <Image src= "/Bhumika.png" alt= "user avatar" width={540}  height={540} className='rounded-full object-cover size-[120px]' />
//         <h3>{userName}</h3>

//     </div>

// </div>




//      </div>
    
//     </>


//   )
// }

// export default Agent








import { cn } from "@/lib/utils";
import { CallerSdkTypeEnum } from "firebase/data-connect";
import Image from "next/image";
import React from "react";

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED= 'FINISHED'
}


const Agent = ({ userName }: AgentProps) => {
  const callStatus = CallStatus.ACTIVE
  const isSpeaking = true;
  const messages= [
    'What is your name ?',
    'My name is Bhumika Pal, Nice to meet you!'
  ];
  const lastMessage=messages[messages.length - 1];

  

  return (
    <>
    <div className="call-view flex gap-10 justify-center items-start px-6 py-10 w-full">
      
      {/* AI INTERVIEWER CARD */}
      <div className="card-interviewer w-[45%] p-8 rounded-xl bg-gradient-to-b from-[#111227] to-[#0a0b16] border border-white/10 flex flex-col items-center">
        
        {/* Avatar with AI badge */}
        <div className="relative flex items-center justify-center">
          {/* Animated border when speaking */}
          {isSpeaking && (
            <span 
             className=
             "absolute w-[95px] h-[95px] rounded-full border-2 border-purple-500 animate-ping opacity-75" 
            />
          )}

          
          {/* Main Avatar */}
          <Image
            src="/logo1.png"
            alt="AI Interviewer"
            width={80}
            height={80}
            className="object-cover"


          />

          {/* AI Badge (small label on top) */}
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg">
            AI
          </span>
        </div>

        {/* Name Below */}
        <h3 className="mt-4 text-lg font-semibold text-white text-center">
          Interviewer
        </h3>
      </div>

      {/* USER CARD */}
     <div className="card-border w-[45%] p-8 rounded-xl bg-gradient-to-b from-[#111227] to-[#0a0b16] border border-white/5 flex items-center justify-center">
  {/* No need of extra flex-col wrapper */}
  <div className="flex flex-col items-center justify-center w-full">
    <Image
      src="/Bhumika.png"
      alt="User Avatar"
      width={120}
      height={120}
      className="rounded-full object-cover"
    />
    <h3 className="mt-4 text-lg font-semibold text-white text-center">
      {userName}
    </h3>
  </div>
</div>

        </div>
        <br/>

        {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
{lastMessage}
            </p>

          </div>
        </div>
        )}



<div className="w-full flex justify-center">
  {callStatus !== 'ACTIVE' ? (
    <button className="relative btn-call">
      <span
        className={cn(
          "absolute animate-ping rounded-full opacity-75",
          callStatus !== "CONNECTING" && "hidden"
        )}
      />
      {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : "......Connecting"}
    </button>
  ) : (
    <button className="btn-disconnect ">
      End
    </button>
  )}
</div>


        </>
     
  );
};

export default Agent;

