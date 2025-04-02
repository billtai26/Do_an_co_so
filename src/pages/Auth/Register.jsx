import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Register() {
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
          Create an Account
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please fill in the details to register
        </Typography>
        <TextField fullWidth label="Name" margin="normal" required />
        <TextField fullWidth label="Email" margin="normal" required />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button component={Link} to="/login" color="primary">
            Login
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

export default Register;
