import PropTypes from "prop-types";

const ProductCardData = ({ label, name }) => {
  return (
    <span>
      <span className="text-xs">{label}</span>
      <h5 className="font-semibold">{name}</h5>
    </span>
  );
};

ProductCardData.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProductCardData;
