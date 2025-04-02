import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#008080",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          textAlign: "center",
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please login to your account
        </Typography>
        <TextField fullWidth label="Email" margin="normal" required />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button component={Link} to="/register" color="primary">
            Register
          </Button>
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
