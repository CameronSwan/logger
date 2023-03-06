const Checkbox = ({ id, label, checked, value, onChange, className, name }) => {
  return (
    <div className={className}>
      <input 
        id={id} 
        type="checkbox"
        name={name}
        value={value} 
        checked={checked} 
        onChange={onChange} 
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;