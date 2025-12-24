import React from 'react'
interface typechldren {
children: React.ReactNode;    
}
function Container({children} : typechldren) {
  return (
    <div className='w-300 m-auto '>
      {children}
    </div>
  )
}

export default Container
