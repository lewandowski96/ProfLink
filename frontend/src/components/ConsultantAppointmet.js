import React from 'react'
import Navbar from './Navbar'

const ConsultantAppointmet = () => {
  return (
    <div>
      <Navbar />
      <div className="consultant-appoinmnt"> 
      <h1><b>Appointment Of Consultant</b></h1>
  <form>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" placeholder="Enter your email" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" placeholder="Enter your phone number" />
      </div>
      <div className="form-group">
        <label htmlFor="web">Web link</label>
        <input type="url" id="web" placeholder="Enter your web link" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="media">Images/Videos:</label>
        <input type="file" id="media" />
      </div>
      <div className="form-group">
        <label htmlFor="datetime">Date & Time</label>
        <input type="datetime-local" id="datetime" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group full-width">
        <label htmlFor="problem">Your Problem</label>
        <textarea id="problem" rows="5" placeholder="Enter your problem"></textarea>
      </div>
    </div>
    <div className="button-group">
      <button type="button" className='submit'>Submit</button>
      <button type="button" className='cancel'>Cancel</button>
    </div>
  </form>
</div>
    </div>
  )
}

export default ConsultantAppointmet
