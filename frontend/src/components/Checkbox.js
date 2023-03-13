const Checkbox = ({ id, label, checked, value, onChange, className, name, title }) => {
  return (
    <div className={className}>
      <input 
        id={id} 
        type="checkbox"
        name={name}
        value={value} 
        checked={checked} 
        onChange={onChange}
		title={title}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;