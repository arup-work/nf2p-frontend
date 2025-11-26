import { Button } from '@mui/material'
import PropType from 'prop-types';

const MuiButton = (props) => {
    const { variant = "contained", loading = false, color = "primary", ...restProps } = props;
    return <Button {...restProps} loading={loading} variant={variant} color={color} />
};

MuiButton.propTypes = {
    variant: PropType.string,
    loading: PropType.bool,
    color: PropType.string,
}

export default MuiButton;