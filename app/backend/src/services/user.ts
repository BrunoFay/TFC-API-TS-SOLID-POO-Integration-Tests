import Users from '../database/models/Users';

const users = async (email: string) => Users.findAll({ where: { email } });
export default users;
