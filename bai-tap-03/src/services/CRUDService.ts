import User from "../../models/user";

export interface IUserInput {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
}

const createNewUser = async (data: IUserInput) => {
  console.log("Dữ liệu đầu vào:", data);
  return await User.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
  });
};

const getAllUser = async () => {
  return await User.findAll();
};

const getUserInfoById = async (userId: string | number) => {
  return await User.findByPk(userId);
};

const updateUserData = async (data: IUserInput) => {
  return await User.update(
    {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
    },
    { where: { id: data.id } }
  );
};

const deleteUserById = async (userId: string | number) => {
  return await User.destroy({ where: { id: userId } });
};

export {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
