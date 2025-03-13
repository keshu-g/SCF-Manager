const Button = ({ children, onClick, className = '', type = 'button' }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`btn btn-primary ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  