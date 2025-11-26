import { Box, Card, CardContent, Container } from "@mui/material"
import { ToastContainer } from "react-toastify";

const StyledAuthLayout = ({ children }) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f0f4fa", // Light blue-gray background for the whole page
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="sm">
                <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                        <ToastContainer />
                        {children}
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default StyledAuthLayout;