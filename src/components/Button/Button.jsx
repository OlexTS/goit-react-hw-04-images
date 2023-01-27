import PropTypes from 'prop-types';
import { ButtonLoad } from "./Button.styled";

const Button = ({onLoadMore}) => {
    return <ButtonLoad type="button" onClick={onLoadMore}>Load more</ButtonLoad>
}


Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired
}
export default Button;