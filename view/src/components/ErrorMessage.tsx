import React from 'react'

interface ErrorMessageProp {
    children: React.ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProp) {
  return (
    <p className="bg-red-50 text-red-700 p-3 uppercase text-sm font-bold text-center">
      {children}
    </p>
  )
}
