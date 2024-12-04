import './App.css';
import React, { useState } from "react";
import Banner from './Banner';

import Creator from './Creator';
import Row from './Row';
import VisibilityControl from './VisibilityControl';

function App() {
  const [userName] = useState("RESERVATION SYSTEM "); 
  const [showCompleted, setShowCompleted] = useState(false); 
  const [reservationItems, setreservationItems] = useState([
    { action: "CN Tower", done: false },
    { action: "Niagara Falls", done: false },
    { action: "Canada's Wonderland", done: false },
    { action: "DisneyWorld", done: false },
    { action: "Great Wall of China", done: false },
    { action: "Eiffel Tower", done: false },
    { action: "Statue of Liberty", done: false },
    { action: "Grand Canyon", done: false },
    { action: "Machu Picchu", done: false },
    { action: "Sydney Opera House", done: false }
  ]);

  const createNewReservation = (task) => {
    if (!reservationItems.find(item => item.action === task)) {
      setreservationItems([
        ...reservationItems,
        { action: task, done: false }
      ]);
    }
  };

  const toggleReservation = (reservation) => {
    setreservationItems(reservationItems.map(item =>
      item.action === reservation.action ? { ...item, done: !item.done } : item
    ));
  };

  // Function to filter and display either all or completed tasks
  const reservationTableRows = (completed = false) => {
    return reservationItems
      .filter(item => completed ? item.done : !item.done)
      .map(item => (
        <Row key={item.action} item={item} toggle={toggleReservation} />
      ));
  };

  return (
    <div>
      <Banner userName={userName} reservationItems={reservationItems} />

      <div className="m-3">
        <Creator callback={createNewReservation} />
      </div>

      <div className="container">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
            <th style={{ width: "75%" }}>Description</th>
            <th style={{ width: "25%" }}>Done</th>
            </tr>
          </thead>
          <tbody>{reservationTableRows()}</tbody>
        </table>
      </div>
      <div className="container">
      {/* Table for Completed Tasks (if showCompleted is true) */}
      {showCompleted && (
       
        <table className="table table-striped table-bordered">
          <thead>
        <tr>
        <th style={{ width: "75%" }}>Description</th>
        <th style={{ width: "25%" }}>Done</th>
        </tr>
        </thead>
          <tbody>{reservationTableRows(true)}</tbody>
        </table>
      )}

      {/* Visibility Control for Completed Tasks */}
      <div className="bg-danger text-white text-center p-2">
        <VisibilityControl
          description="Bookings"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
        />
      </div>
      </div>
    </div>
    
  );
}

export default App;
