import PropTypes from "prop-types";
function TextInput({ register, message, placeholder, name }) {
  return (
    <div>
      <input type="text" placeholder={placeholder} {...register(name)} />
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
TextInput.propTypes = {
  register: PropTypes.func,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};
export default TextInput;
