import {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
} from "../services/CRUDService.js";

const getHomePage = (req, res) => {
  return res.render("home.ejs");
};

const getCRUD = (req, res) => {
  return res.render("users/createUser.ejs");
};

const postCRUD = async (req, res) => {
  const { email, firstName, lastName, address } = req.body;
  console.log("Dữ liệu nhận được:", req.body);
  if (!email || !firstName || !lastName || !address) {
    return res.send("Vui lòng điền đầy đủ thông tin");
  }
  await createNewUser(req.body);
  return res.redirect("/get-crud");
};

const displayGetCRUD = async (req, res) => {
  const dataTable = await getAllUser();
  return res.render("users/findAllUser.ejs", { dataTable });
};

const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userData = await getUserInfoById(userId);
    if (userData) {
      return res.render("users/updateUser.ejs", { user: userData });
    }
    return res.send("Không tìm thấy người dùng");
  }
  return res.send("Không tìm thấy người dùng");
};

const putCRUD = async (req, res) => {
  await updateUserData(req.body);
  return res.redirect("/get-crud");
};

const deleteCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    await deleteUserById(userId);
    return res.redirect("/get-crud");
  }
  return res.send("Không tìm thấy người dùng");
};

export default {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
