const DashboardPage = () => (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
            Dashboard Overview
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4, mt: 1 }}>
            <Grid item xs={12} md={4}>
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
                                <PersonIcon fontSize="large" />
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
                                    Revenue
                                </Typography>
                                <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                                    $45.2K
                                </Typography>
                            </Box>
                            <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                                <BarChartIcon fontSize="large" />
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
                                <SettingsIcon fontSize="large" />
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
    </Container>
);