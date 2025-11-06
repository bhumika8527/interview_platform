


// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { vapi } from "@/lib/vapi.sdk";

// /**
//  * NOTES:
//  * - Ensure process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID is set in your .env and available to the browser.
//  * - This component expects the vapi SDK to emit 'message', 'speech-start', 'speech-end', 'call-start', 'call-end' events.
//  * - 'message' should have shape: { type: 'transcript', transcriptType: 'interim'|'final', role: 'user'|'assistant', transcript: string }
//  */

// enum CallStatus {
//   INACTIVE = "INACTIVE",
//   CONNECTING = "CONNECTING",
//   ACTIVE = "ACTIVE",
//   FINISHED = "FINISHED",
// }

// interface SavedMessage {
//   role: "user" | "assistant";
//   content: string;
// }

// interface AgentProps {
//   userName: string;
//   userId: string;
//   // keep type optional so callers can pass it or not
//   type?: string;
// }

// const Agent: React.FC<AgentProps> = ({ userName, userId, type }) => {
//   const router = useRouter();

//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
//   const [messages, setMessages] = useState<SavedMessage[]>([]);

//   // show live interim transcript while assistant speaks
//   const [interimSubtitle, setInterimSubtitle] = useState<string | null>(null);

//   useEffect(() => {
//     const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
//     const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

//     // Message event handler (adjust to your vapi message shape if different)
//     const onMessage = (message: any) => {
//       try {
//         if (message?.type === "transcript") {
//           if (message.transcriptType === "interim") {
//             // show live interim text above call button
//             setInterimSubtitle(message.transcript || "");
//           } else if (message.transcriptType === "final") {
//             // clear interim and push final text
//             setInterimSubtitle(null);
//             const newMessage: SavedMessage = {
//               role: message.role === "user" ? "user" : "assistant",
//               content: message.transcript ?? "",
//             };
//             setMessages((prev) => [...prev, newMessage]);
//           }
//         }
//       } catch (err) {
//         console.error("onMessage error", err);
//       }
//     };

//     const onSpeechStart = () => setIsSpeaking(true);
//     const onSpeechEnd = () => setIsSpeaking(false);
//     const onError = (e: Error) => console.error("vapi error", e);

//     vapi.on("call-start", onCallStart);
//     vapi.on("call-end", onCallEnd);
//     vapi.on("message", onMessage);
//     vapi.on("speech-start", onSpeechStart);
//     vapi.on("speech-end", onSpeechEnd);
//     vapi.on("error", onError);

//     return () => {
//       vapi.off("call-start", onCallStart);
//       vapi.off("call-end", onCallEnd);
//       vapi.off("message", onMessage);
//       vapi.off("speech-start", onSpeechStart);
//       vapi.off("speech-end", onSpeechEnd);
//       vapi.off("error", onError);
//     };
//   }, []);

//   // navigate home when call ends (optional)
//   useEffect(() => {
//     if (callStatus === CallStatus.FINISHED) {
//       // small timeout so final subtitle can be read (optional)
//       setTimeout(() => router.push("/"), 500);
//     }
//   }, [callStatus, router]);

//  const handleCall = async () => {
//   setCallStatus(CallStatus.CONNECTING);
//   const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

//   if (!workflowId) {
//     console.error("NEXT_PUBLIC_VAPI_WORKFLOW_ID not set");
//     setCallStatus(CallStatus.INACTIVE);
//     return;
//   }

//   try {
//     await vapi.start(workflowId, {
//       variableValues: {
//         username: userName ?? "",
//         userid: userId ?? "",
//       },
      
//     });
//   } catch (err) {
//     console.error("vapi.start error:", err);
//     setCallStatus(CallStatus.INACTIVE);
//   }
// };

//   const handleDisconnect = async () => {
//     try {
//       vapi.stop();
//     } catch (err) {
//       console.warn("vapi.stop error", err);
//     }
//     setCallStatus(CallStatus.FINISHED);
//   };

//   const latestFinal = messages.length ? messages[messages.length - 1].content : null;
//   // show interim if present else latest final
//   const subtitleToShow = interimSubtitle ?? latestFinal ?? null;

//   const isCallInactiveOrFinished =
//     callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

//   return (
//     <>
//       <div className="call-view flex gap-10 justify-center items-start px-6 py-10 w-full">
//         {/* AI CARD */}
//         <div className="card-interviewer w-[45%] p-8 rounded-xl bg-gradient-to-b from-[#111227] to-[#0a0b16] border border-white/10 flex flex-col items-center">
//           <div className="relative flex items-center justify-center">
//             {isSpeaking && <span className="absolute w-[95px] h-[95px] rounded-full border-2 border-purple-500 animate-ping opacity-75" />}
//             <Image src="/logo1.png" alt="AI Interviewer" width={80} height={80} className="object-cover" />
//             <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg">AI</span>
//           </div>
//           <h3 className="mt-4 text-lg font-semibold text-white text-center">Interviewer</h3>
//         </div>

//         {/* USER CARD */}
//         <div className="card-border w-[45%] p-8 rounded-xl bg-gradient-to-b from-[#111227] to-[#0a0b16] border border-white/5 flex items-center justify-center">
//           <div className="flex flex-col items-center justify-center w-full">
//             <Image src="/Bhumika.png" alt="User Avatar" width={120} height={120} className="rounded-full object-cover" />
//             <h3 className="mt-4 text-lg font-semibold text-white text-center">{userName}</h3>
//           </div>
//         </div>
//       </div>

//       {/* Subtitles above call button */}
//       <div className="w-full flex justify-center mt-4">
//         {subtitleToShow ? (
//           <div className={cn("subtitle-bar", interimSubtitle ? "subtitle-interim" : "")}>
//             {subtitleToShow}
//           </div>
//         ) : (
//           // if you want placeholder text when nothing present, uncomment:
//           // <div className="subtitle-bar subtitle-placeholder">Click call to start the interview</div>
//           null
//         )}
//       </div>

//       {/* Call button */}
//       <div className="w-full flex justify-center mt-6">
//         {callStatus !== CallStatus.ACTIVE ? (
//           <button className="relative btn-call" onClick={handleCall}>
//             <span className={cn("absolute animate-ping rounded-full opacity-75", callStatus !== CallStatus.CONNECTING && "hidden")} />
//             <span>{isCallInactiveOrFinished ? "Call" : "...Connecting"}</span>
//           </button>
//         ) : (
//           <button className="btn-disconnect" onClick={handleDisconnect}>
//             End
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Agent

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "assistant";
  content: string;
}

interface AgentProps {
  userName: string;
  userId: string;
  type?: string;
   interviewId?: string;
  questions?: string[];
}

const Agent: React.FC<AgentProps> = ({ userName, userId,type,interviewId,questions }) => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [interimSubtitle, setInterimSubtitle] = useState<string | null>(null);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;

    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      console.log("Call started ✅");
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      console.log("Call ended");
    };

    const onMessage = (message: any) => {
      if (message?.type === "transcript") {
        if (message.transcriptType === "interim") {
          setInterimSubtitle(message.transcript || "");
        } else if (message.transcriptType === "final") {
          setInterimSubtitle(null);
          setMessages((prev) => [
            ...prev,
            {
              role: message.role === "user" ? "user" : "assistant",
              content: message.transcript ?? "",
            },
          ]);
        }
      }
    };

   
    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, [isClient]);

  const handleGenerateFeedback = async (messsages:
    SavedMessage[]) =>{
      console.log('Generate feedback here.');
      const {success, id} = {
        success:true,
        id:'feedback-id'
      }
     if(success && id){
      router.push(`/interview/${interviewId}/feedback`)
     }else{
      console.log('Error saving feedback');
      router.push('/')
     }

    }
  

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if(type === 'geneerate'){
        router.push('/')
      }
      else{
        handleGenerateFeedback(messages);
      }
    }
  }, [messages,callStatus,type,userId]);


//   const handleCall= async ()=>{
//   setCallStatus(CallStatus.CONNECTING);

//   if(type === 'generate'){

//   const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
//   if (!workflowId) return console.error("❌ No workflow ID found");

//   try {
//     await vapi.start(
//       undefined, // no assistant
//       undefined, // no overrides
//       undefined, // no squad
//       workflowId, // ✅ workflow mode
//       {
//         variableValues: {
//           username: userName,
//           userid: userId,
//         },
//       }
    
//     ); // ✅ close here
//   } catch (err) {
//     console.error("vapi.start failed:", err);
//     setCallStatus(CallStatus.INACTIVE);
//   }
// };
//   } else{
//     let formattedQuestions = ' '

//     if(questions){
//       formattedQuestions = questions.map((question)=> `-${question}`).join('\n')
//     }
//     await vapi.start('interviewer',{
//       variableValues:{
//         questions:formattedQuestions
//       }
//     })
//   }


//HANDLE CALL/TESTING CODE//////////////////
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };


  const handleDisconnect = () => {
    try { vapi.stop(); } catch {}
    setCallStatus(CallStatus.FINISHED);
  };

  if (!isClient) return null;

  const latestFinal = messages.length ? messages[messages.length - 1].content : null;
  const subtitleToShow = interimSubtitle ?? latestFinal ?? null;
  const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

 
 


  return (
    <>
      <div className="call-view flex gap-10 justify-center items-start px-6 py-10 w-full">
        <div className="card-interviewer w-[45%] p-8 rounded-xl bg-gradient-to-b from-[#111227] to-[#0a0b16] border border-white/10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {isSpeaking && (
              <span className="absolute w-[95px] h-[95px] rounded-full border-2 border-purple-500 animate-ping opacity-75" />
            )}
<Image
  src="/logo1.png"
  alt="logo"
  width={100}
  height={100}
  className="w-20 h-auto"
/>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg">
              AI
            </span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white text-center">Interviewer</h3>
        </div>

        <div className="card-border w-[45%] p-8 rounded-xl bg-gradient-to-b from-[#111227] to-[#0a0b16] border border-white/5 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            <Image src="/Bhumika.png" width={120} height={120} alt="User" className="rounded-full" />
            <h3 className="mt-4 text-lg font-semibold text-white text-center">{userName}</h3>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-4">
        {subtitleToShow && (
          <div className={cn("subtitle-bar", interimSubtitle ? "subtitle-interim" : "")}>
            {subtitleToShow}
          </div>
        )}
      </div>

      <div className="w-full flex justify-center mt-6">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call" onClick={handleCall}>
            <span className={cn("absolute animate-ping rounded-full opacity-75",
              callStatus !== "CONNECTING" && "hidden")} />
            <span>{isCallInactiveOrFinished ? "Call" : "...Connecting"}</span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>End</button>
        )}
      </div>
    </>
  );
};

export default Agent
