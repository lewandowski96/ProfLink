import React, { useState } from 'react';
import Navbar from './Navbar';

const ConsultViewAppointment = () => {
  // Sample appointment data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      webLink: 'www.example.com',
      dateTime: '2024-05-10T10:00',
      problem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      done: false, // Initially not done
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1987654321',
      webLink: 'www.example.com',
      dateTime: '2024-05-15T14:00',
      problem: 'Nullam nec purus vehicula, fermentum metus in, rhoncus elit.',
      done: true, // Initially done
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '+1122334455',
      webLink: 'www.example.com',
      dateTime: '2024-05-18T13:30',
      problem: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    {
      id: 4,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+9988776655',
      webLink: 'www.example.com',
      dateTime: '2024-05-20T09:45',
      problem: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    },
    {
      id: 5,
      name: 'Emily Wilson',
      email: 'emily.wilson@example.com',
      phone: '+3344556677',
      webLink: 'www.example.com',
      dateTime: '2024-05-22T11:15',
      problem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 6,
      name: 'Daniel Lee',
      email: 'daniel.lee@example.com',
      phone: '+7788990011',
      webLink: 'www.example.com',
      dateTime: '2024-05-25T15:00',
      problem: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 7,
      name: 'Olivia Taylor',
      email: 'olivia.taylor@example.com',
      phone: '+1122334455',
      webLink: 'www.example.com',
      dateTime: '2024-05-28T17:30',
      problem: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 8,
      name: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      phone: '+6655443322',
      webLink: 'www.example.com',
      dateTime: '2024-05-30T10:30',
      problem: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 9,
      name: 'Matthew Garcia',
      email: 'matthew.garcia@example.com',
      phone: '+7788990011',
      webLink: 'www.example.com',
      dateTime: '2024-06-02T14:45',
      problem: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    },
  ]);

  const handleToggleDone = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, done: !appointment.done } : appointment
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="view-appointments" style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>
          <b>Appointments of Customers</b>
        </h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Phone Number</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Web Link</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date & Time</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Problem</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.phone}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.webLink}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(appointment.dateTime).toLocaleString()}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.problem}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {appointment.done ? (
                    <button
                      style={{ backgroundColor: 'green', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => handleToggleDone(appointment.id)}
                    >
                      Undo
                    </button>
                  ) : (
                    <button
                      style={{ backgroundColor: 'blue', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={() => handleToggleDone(appointment.id)}
                    >
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultViewAppointment;
