const validateNickname = str => {
	const reg = /^[a-zA-Z0-9]+$/;
	const result = reg.test(str);
	if (!result) return false;
	return true;
};

const validatePassword = str => {
	const reg = /^[a-zA-Z0-9]+$/;
	const result = reg.test(str);
	if (!result) return false;
	return true;
};
const validateEmail = str => {
	const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	const result = reg.test(str);
	if (!result) return false;
	return true;
};

export { validateNickname, validatePassword, validateEmail };
