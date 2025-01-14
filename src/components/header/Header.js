import React from 'react'
import './Header.css'

const header = () => {
  return (
    <div className="header-section">
      <div>
        <ion-icon name="location-outline"></ion-icon>
        <span>Johannesburg, JHB</span>
      </div>
      <div>
        <ion-icon name="search-outline"></ion-icon>
        <input type="text" placeholder="Search here" />
      </div>
      <div>
        <ion-icon name="calendar-outline"></ion-icon>
        <ion-icon name="notifications-outline"></ion-icon>
      </div>
    </div>
  )
}

export default header