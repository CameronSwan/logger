const Checkbox = ({ id, label, checked, value, onChange, className }) => {
  return (
    <div className={className}>
      <input 
        id={id} 
        type="checkbox"
        value={value} 
        checked={checked} 
        onChange={onChange} 
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;