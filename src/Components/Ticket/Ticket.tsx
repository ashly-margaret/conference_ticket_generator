import  { useEffect, useState } from 'react'
import './Ticket.scss'
import logoMark from '../../assets/images/logo-mark.svg'
import IconGit from '../../assets/images/icon-github.svg'

function Ticket(props:any) {
    
    const [ticketNumber, setTicketNumber] = useState('');

  // Function to generate a random ticket number
  const generateTicketNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a random number
    return `TICKET-${randomNumber}`;
  };

  useEffect(() => {
    // When the component mounts or props changes, generate a new ticket number
    setTicketNumber(generateTicketNumber());
  }, [props?.formData]);
  return (
    <div className='ticket_conatiner'>
        <div className="title">
        <h1>Congrats,<span className='span'>{props?.formData?.fullName} !</span></h1>
        <h1>Your Ticket Is Ready.</h1>
        </div>
        <div className="desc">
            We have emailed your ticket to
            <div>{props?.formData?.email}</div> and will send updates in
            the run up to the event.
        </div>
        <div className="ticket_generator">
            <div className="ticket">
                <div className="left">
                <div className="top">
                <div className="top_left">
                        <img src={logoMark} alt="logoMark" />
                    </div>
                    <div className="top_right">
                        <h2 className='hedaing'>Coding Conf</h2>
                        <div>Jan 31, 2025 / Austin,Tx</div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom_left">
                        <img  src={URL.createObjectURL(props?.formData?.avatar)} alt="" className='imageAvatar' />
                    </div>
                    <div className="bottom_right">
                        <div className='name'>
                        <h3>{props?.formData?.fullName}</h3>
                        </div>                      
                        <div className='user_name'>
                            <img src={IconGit} alt="IconGit" />
                            <span>{props?.formData?.githubUsername}</span>
                        </div>
                    </div>
                </div>
                    
                </div>
                <div className="right">
                    <div className="ticketNumber">
                    {ticketNumber} {/* Display the random ticket number */}
                    </div>
                    
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default Ticket