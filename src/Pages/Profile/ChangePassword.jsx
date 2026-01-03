import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Box,
    Typography
} from '@mui/material';
import {
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    Close as CloseIcon
} from '@mui/icons-material';
import { useState } from 'react';
import UserService from '../../Services/UserService';

const ChangePassword = ({ isOpen, onClose, token }) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const handleClose = () => {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        onClose();
    };

    const handlePasswordChange = async () => {
        const response = await UserService.updatePassword(token, passwordData.currentPassword, passwordData.newPassword)
        if (response.success) handleClose();


    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle sx={{ pb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                        Change Password
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{ color: 'text.secondary' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}>
                    {/* Current Password */}
                    <TextField
                        fullWidth
                        label="Current Password"
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    {/* New Password */}
                    <TextField
                        fullWidth
                        label="New Password"
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        variant="outlined"
                        helperText="Must be at least 8 characters"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />

                    {/* Confirm New Password */}
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        variant="outlined"
                        error={passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword}
                        helperText={
                            passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword
                                ? "Passwords don't match"
                                : ''
                        }
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handlePasswordChange}
                    variant="contained"
                    disabled={
                        !passwordData.currentPassword ||
                        !passwordData.newPassword ||
                        passwordData.newPassword !== passwordData.confirmPassword ||
                        passwordData.newPassword.length < 8
                    }
                >
                    Update Password
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePassword;