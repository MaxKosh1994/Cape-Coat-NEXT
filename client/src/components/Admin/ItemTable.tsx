import { useState, useEffect } from "react";

import { Button } from "@mui/material";

export default function ItemTable(props) {
  const handleUpdateItem = (id) => {
    props.handleOpenItem();
    props.setId((prev) => id);
  };
  return (
    <><div style={{ maxHeight: '500px', overflow: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Bestseller</th>
          </tr>
        </thead>
        <tbody>
          {props.content.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.in_stock ? "Yes" : "No"}</td>
              <td>{item.bestseller ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleUpdateItem(item.id)} type="button">
                  Изменить товар
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
