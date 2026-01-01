import { Avatar, Box, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import StyledMainLayout from "../../Components/StyledMainLayout";
import { SettingsApplicationsRounded } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";

const DashboardView = () => {
    const authUserDetails = useSelector((state) => state.auth.auth);
    // Function to convert name to Title Case (Camel Case for each word)
    const toTitleCase = (str) => {
        if (!str) return '';
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <StyledMainLayout>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: 'primary.main' }}>
                Welcome back, {toTitleCase(authUserDetails.user?.name)}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4, mt: 1 }}>
                <Grid size={{ xs: 12, md: 4 }} >
                    <Card elevation={2}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2">
                                        Total Users
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                                        2,543
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                                    {/* <PersonIcon fontSize="large" /> */}
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card elevation={2}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2">
                                        Revenue
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                                        $45.2K
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                                    {/* <BarChartIcon fontSize="large" /> */}
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={2}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2">
                                        Active Projects
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                                        12
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                                    <SettingsApplicationsRounded fontSize="large" />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                    Recent Activity
                </Typography>
                <List>
                    {[1, 2, 3, 4].map((item) => (
                        <React.Fragment key={item}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'grey.300' }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`Activity ${item}`}
                                    secondary={`Description of activity ${item}`}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    2 hours ago
                                </Typography>
                            </ListItem>
                            {item < 4 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </StyledMainLayout>
    )
};

export default DashboardView;