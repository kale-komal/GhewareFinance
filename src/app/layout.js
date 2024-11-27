'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./globals.css";



config.autoAddCss = false;

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Gheware Finance</title>
        <link rel="icon" href="/images/logo/logo.png" />
        
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
