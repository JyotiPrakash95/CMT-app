
      let customers = [];
      const capacity = 25;
      let seatsLeft = 25;

      const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const guestCount = parseInt(form.guestCount.value, 10);
        const name = form.name.value;
        const phone = form.phone.value;

        // Guest count validation
        if (guestCount > seatsLeft) {
          alert("Guest count exceeds capacity.");
          return;
        }

        // Duplicate name entry handling
        if (customers.some((customer) => customer.name === name)) {
          alert("Customer already exists.");
          return;
        }

        // Record customer
        const customer = {
          name,
          phone,
          count: guestCount,
          checkin: new Date().toLocaleTimeString(),
          checkout: null,
        };
        customers.unshift(customer); // Add to the beginning of the array
        seatsLeft -= guestCount;

        // Clear form
        form.reset();

        // Update UI
        renderApp();
      };

      const handleCheckout = (index) => {
        const customer = customers[index];
        customer.checkout = new Date().toLocaleTimeString();
        seatsLeft += customer.count;
        renderApp();
      };

      const handleDelete = (index) => {
        const customer = customers[index];
        if (!customer.checkout) {
          seatsLeft += customer.count;
        }
        customers.splice(index, 1); // Remove customer from array
        renderApp();
      };

      const renderApp = () => {
        const App = () => (
          <div className="App" style={{ textAlign: "center" }}>
            <div>
              <h2>Total Capacity: {capacity}</h2>
              <h2>Seats Left: {seatsLeft}</h2>
            </div>

            {/* Create a form here */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="guestCount">Guest Count:</label>
                <input type="number" id="guestCount" name="guestCount" required />
              </div>
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" required />
              </div>
              <button type="submit">Submit</button>
            </form>

            {/* Complete table to show records of customers */}
            <table border="1px" style={{ margin: "auto" }}>
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Remove Entry</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.count}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.checkin}</td>
                    <td>
                      {customer.checkout ? (
                        customer.checkout
                      ) : (
                        <button
                          className="dining"
                          onClick={() => handleCheckout(index)}
                        >
                          Click to Checkout
                        </button>
                      )}
                    </td>
                    <td>{customer.checkout ? "Served" : "Dining"}</td>
                    <td>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

        const rootElement = ReactDOM.createRoot(document.getElementById("root"));
        rootElement.render(<App />);
      };

      renderApp(); // Initial rendering
