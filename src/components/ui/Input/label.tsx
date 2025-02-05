import React from 'react'
import { LabelTypes } from './labelTypes'
import { cn } from '@/lib/utils'

const Label = ({content, className}: LabelTypes) => {
  return (
    <label className={cn(
      'font-medium text-[14px] leading-[20.3px] text-customBlack-grey',
      className
      )}>
      {content}
    </label>
  )
}

export default Label