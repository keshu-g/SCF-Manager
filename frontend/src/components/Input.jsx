const Input = ({ label, type = 'text', value, onChange, placeholder }) => {
    return (
      <div className="form-control w-full mb-4">
        {label && <label className="label">{label}</label>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input input-bordered w-full"
        />
      </div>
    );
  };
  
  export default Input;
  