import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
  return (
    <div className="pt-24 px-6">
      <h3 className="text-2xl font-semibold mb-8">Interview Generation</h3>
      <Agent userName="You" userId="user1" type="generate"/>
    </div>
  );
};

export default page;
