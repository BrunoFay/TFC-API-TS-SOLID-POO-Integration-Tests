import Teams from '../database/models/Teams';
import Users from '../database/models/Users';

export const getUsers = async (email: string) => Users.findAll({ where: { email } });
export const getTeam = async (id: number) => Teams.findByPk(id);
