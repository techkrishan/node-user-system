import bcrypt from 'bcrypt';


export const encryptPassword = async (plainPassword) => {
    // Generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // Update the plan password to hashed password
    return  bcrypt.hash(plainPassword, salt);
};


export const comparePassword = async (requestedPassword, actualPassword) => {
    return bcrypt.compare(requestedPassword, actualPassword);
};