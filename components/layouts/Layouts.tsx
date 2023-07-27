import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { NavBar, Sidebar } from '../ui';
import { Box } from "@mui/material";
export const Layouts = ({ children, title = 'Home Page' }: PropsWithChildren<{ title: string }>) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      <Sidebar />
      <Box sx={{ padding: '10px 20px' }}>
        {children}
      </Box>
    </Box>
  )
}
