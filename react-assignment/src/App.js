import React, { useState, useEffect } from "react";
import "./App.css";
import Banner from "./Banner";
import Creator from "./Creator";
import Row from "./Row";
import VisibilityControl from "./VisibilityControl";

function App() {
  const [userName] = useState("RESERVATION SYSTEM");

  const [showCompleted, setShowCompleted] = useState(false);

  const [reservationItems, setReservationItems] = useState([
    { action: "CN Tower", done: false },
    { action: "Niagara Falls", done: false },
    { action: "Canada's Wonderland", done: false },
    { action: "DisneyWorld", done: false },
    { action: "Great Wall of China", done: false },
    { action: "Eiffel Tower", done: false },
    { action: "Statue of Liberty", done: false },
    { action: "Grand Canyon", done: false },
    { action: "Machu Picchu", done: false },
    { action: "Sydney Opera House", done: false },
  ]);

  // Add new reservation
  const createNewReservation = (task) => {
    if (!reservationItems.find((item) => item.action === task)) {
      setReservationItems([
        ...reservationItems,
        { action: task, done: false },
      ]);
    }
  };

  // Toggle reservation state
  const toggleReservation = (reservation) => {
    const updatedReservations = reservationItems.map((item) =>
      item.action === reservation.action
        ? { ...item, done: !item.done }
        : item
    );

    setReservationItems(updatedReservations);
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
  };

  // Filter and display reservation rows
  const reservationTableRows = (doneValue) =>
    reservationItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <Row key={item.action} item={item} toggle={toggleReservation} />
      ));

  // Load saved reservations from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("reservations");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setReservationItems(parsedData);
        }
      }
    } catch (error) {
      console.error("Failed to load reservations:", error);
    }
  }, []); 

  return (
    <div>
      {/* Header Section */}
      <Banner userName={userName} reservationItems={reservationItems} />

      {/* Reservation Creator */}
      <div className="m-3">
        <Creator callback={createNewReservation} />
      </div>

      {/* Reservations Table */}
      <div className="container">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ width: "75%" }}>Description</th>
              <th style={{ width: "25%" }}>Available</th>
            </tr>
          </thead>
          <tbody>{reservationTableRows(false)}</tbody>
        </table>
      </div>

      {/* Completed Reservations Table */}
      {showCompleted && (
        <div className="container">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ width: "75%" }}>Description</th>
                <th style={{ width: "25%" }}>Booked</th>
              </tr>
            </thead>
            <tbody>{reservationTableRows(true)}</tbody>
          </table>
        </div>
      )}

      {/* Visibility Control */}
      <div className="bg-danger text-white text-center p-2">
        <VisibilityControl
          description="Bookings"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
        />
      </div>
    </div>
  );
}

export default App;
