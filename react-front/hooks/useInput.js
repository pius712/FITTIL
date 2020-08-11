import { useState, useCallback } from 'react';

export default initValue => {
	const [value, setValue] = useState(initValue);
	// if (initValue !== value) {
	// 	setValue(initValue);
	// }
	const onChangeValue = useCallback(
		e => {
			// e.preventDefault();
			setValue(e.target.value);
		},
		[value, setValue],
	);
	// console.log('useInput', initValue, value);
	return [value, onChangeValue, setValue];
};
