import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function BoardContent() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Di chuyển lên phía trên
        paddingTop: 4, // Thêm khoảng cách phía trên
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default BoardContent;
