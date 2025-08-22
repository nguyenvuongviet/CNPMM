import User from "../../models/user";

const createNewUser = async (data) => {
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

const getUserInfoById = async (userId) => {
  return await User.findByPk(userId);
};

const updateUserData = async (data) => {
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

const deleteUserById = async (userId) => {
  return await User.destroy({ where: { id: userId } });
};

export {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
