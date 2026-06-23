import React from "react";

const DataTable = ({ data, search }) => {

  const filteredData = data.filter((item) =>
    item.customer
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Uploaded Data
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Customer</th>
            <th>Sales</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.customer}</td>
                <td>{item.sales}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;