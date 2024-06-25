"use client"

import { SessionProvider } from "next-auth/react"

interface IProvidersProps {
  children: React.ReactNode;
}

const Providers = ({children}: IProvidersProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Providers