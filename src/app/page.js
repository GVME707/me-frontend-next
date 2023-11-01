"use client"
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("API URL from env:", apiUrl);  // Debugging line

    if (!apiUrl) {
      console.error("API URL is not set!");  // Debugging line
      return;
    }

    const fetchUrl = `${apiUrl}/users`;
    console.log("Fetching data from:", fetchUrl);  // Debugging line

    fetch(fetchUrl)
      .then((response) => {
        console.log("Fetch response:", response);  // Debugging line
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        console.log("Received JSON data:", json);  // Debugging line
        setUsers(json);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  return (
    <main>
      <h1>React App</h1>
      <div>
        {users.length === 0 ? (  // Debugging line
          <div>No users found</div>
        ) : (
          users.map((user) => (
            <div key={user.id}>
              <li>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </li>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
