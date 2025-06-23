"use client"

import Aos from "aos"
import 'aos/dist/aos.css';
import { useEffect } from "react"

export default function AnimationComp() {
      useEffect(() => {
    Aos.init({
      duration: 1500,
      delay: 100
    })
  },[])
    return (
      <>
      </>  
    )
  }
