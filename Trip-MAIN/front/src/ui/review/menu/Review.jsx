import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReviewList from '../submenu/ReviewList'
import ReviewWrite from '../submenu/ReviewWrite'

function Review() {
  return (
    <div>
        <Routes>
            <Route exact path="/" element={<ReviewList />} />
            <Route path="/reviewWrite" element={<ReviewWrite />} />
        </Routes>  
  </div>
  )
}

export default Review