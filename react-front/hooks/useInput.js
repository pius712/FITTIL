import { useState, useCallback } from 'react';

export default initValue => {
	const [value, setValue] = useState(initValue);

	const onChangeValue = useCallback(
		e => {
			e.preventDefault();
			setValue(e.target.value);
		},
		[value, setValue],
	);
	return [value, onChangeValue, setValue];
};
