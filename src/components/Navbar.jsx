const Navbar = ({ darkMode, setDarkMode, onLogout, onExport }) => {
  return (
    <div className="navbar">
      <h2 className="logo move-text">💰 Finance Tracker</h2>

      <div className="nav-actions">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>

        <button onClick={onExport}>📁 Export</button>

        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;