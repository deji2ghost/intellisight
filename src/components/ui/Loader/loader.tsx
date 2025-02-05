import React from 'react'
import { FiLoader } from 'react-icons/fi'

const Loader = ({className}: {className: string}) => {
  return (
    <div className={className}>
      <FiLoader />
    </div>
  )
}

export default Loader
