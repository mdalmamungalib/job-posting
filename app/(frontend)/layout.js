import "@/scss/globals.scss";

const Layout = ({ children }) => {

  return (
    <>
      {/* Main Content Area */}
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-[calc(100vh-200px)] focus:outline-none"
        aria-label="Main content">
        {children}
      </main>
    </>
  );
};

export default Layout;