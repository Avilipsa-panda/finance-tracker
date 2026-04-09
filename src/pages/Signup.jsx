import { useState } from "react";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ FIX

  const handleSignup = (e) => {
    e.preventDefault();

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful!");
    onSignup();
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "180px" }}
        />

        {/* Password with eye */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", width: "180px", paddingRight: "35px" }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Button */}
        <button type="submit" style={{ padding: "8px 15px" }}>
          Signup
        </button>
      </div>
    </form>
  );
};

export default Signup;