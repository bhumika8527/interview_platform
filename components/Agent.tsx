import Image from 'next/image'
import React from 'react'

const Agent = ({userName}:AgentProps) => {
    const isSpeaking = true;

  return (
    <>
    <div className='call-view'>
     <div className='card-interviewer'>
<div className='avatar'>
    
    <Image src="/logo1.png" alt="vapi" width={56} height={54} className='object-cover' />
 {isSpeaking && <span className='animate-speak'/>}

 <h3> AI Interviewer</h3>
</div>
</div>


<div className='card-border'>
    <div className='card-content'>

        <Image src= "/Bhumika.png" alt= "user avatar" width={540}  height={540} className='rounded-full object-cover size-[120px]' />
        <h3>{userName}</h3>

    </div>

</div>




     </div>
    
    </>


  )
}

export default Agent