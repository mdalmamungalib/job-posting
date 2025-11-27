"use client";

import ResponsiveNavbar from "@/components/Frontend/Navbar/ResponsiveNavbar";

export default function page() {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatar.jpg",
    isLoggedIn: true,
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement search logic
  };

  const handleLogin = () => {
    console.log("Login triggered");
    // Implement login logic
  };

  const handleLogout = () => {
    console.log("Logout triggered");
    // Implement logout logic
  };

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveNavbar
        user={mockUser}
        notifications={3}
        onSearch={handleSearch}
        onLogin={handleLogin}
        onLogout={handleLogout}
        currentPath="/"
      />

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Welcome to JobPost
          </h1>
          <p className="text-xl text-muted-foreground">
            Find your dream job today
          </p>
        </div>
      </main>
    </div>
  );
}
