const Checkbox = ({ id, label, checked, value, onChange, className, name, title, customLabel }) => {
	return (
		<div className={className}>
			<input
				id={id}
				type='checkbox'
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				title={title}
			/>
			<label htmlFor={id} title={title}>{label}</label>
			<div>{customLabel}</div>
		</div>
	);
};

export default Checkbox;