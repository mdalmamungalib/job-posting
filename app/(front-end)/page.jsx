"use client";

import { Button } from "flowbite-react";
import { useState } from "react";

export default function page() {
  const [loading, setLoading] = useState(false);

  const createUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You can send additional data if needed
        body: JSON.stringify({}),
      });

      const data = await response.json();
      console.log("Created users:", data);
      alert("Users created successfully!");
    } catch (error) {
      console.error("Error creating users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Button color="cyan" onClick={createUsers} disabled={loading}>
        {loading ? "Creating..." : "Create Sample Users"}
      </Button>
    </div>
  );
}
