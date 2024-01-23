import bcrypt from "bcryptjs";

export const hashPassword = async password => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export const checkPassword = async (password, password2) => {
	const check = await bcrypt.compare(password2, password);
	return check;
};

export default {
	hashPassword,
	checkPassword
};
