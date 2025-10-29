import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
       <h2> Boost your interview skills with intelligent practice and real-time feedback
         </h2>

       <p className='text-lg'>
          Practice real interview questions with instant feedback
       </p>

       <Button asChild className='btn-primary max-sm:w-full'>
<Link  href= "/interview" >Start an Interview</Link>
       </Button>
      </div>

      <Image src= "/robot.png" alt="robot" width ={220} height= {250} className='max-sm:hidden rounded-lg'/>
    </section>

    <section className='flex flex-col gap-8 mt-8'>
<h2>Your Interviews</h2>

<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
  {dummyInterviews.map((interview)=>(
    <InterviewCard  {...interview} key={interview.id}/>
  ))}

</div>
    </section>

    <section className='flex flex-col gap-9 mt-8' >
 <h2>Take an Interview</h2>
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
    {dummyInterviews.map((interview)=>(
    <InterviewCard  {...interview}/>
  ))}
  </div>

    </section>
    
    
    </>
  )
}

export default page