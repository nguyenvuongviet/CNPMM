import { Request, Response } from "express";
import {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
} from "../services/CRUDService";

const getHomePage = (req: Request, res: Response): void => {
  res.render("home.ejs");
};

const getCRUD = (req: Request, res: Response): void => {
  res.render("users/createUser.ejs");
};

const postCRUD = async (req: Request, res: Response): Promise<void> => {
  const { email, firstName, lastName, address } = req.body;

  console.log("Dữ liệu nhận được:", req.body);

  if (!email || !firstName || !lastName || !address) {
    res.send("Vui lòng điền đầy đủ thông tin");
    return;
  }

  await createNewUser(req.body);
  res.redirect("/get-crud");
};

const displayGetCRUD = async (req: Request, res: Response): Promise<void> => {
  const dataTable = await getAllUser();
  res.render("users/findAllUser.ejs", { dataTable });
};

const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
  const userId = req.query.id as string | undefined;

  if (userId) {
    const userData = await getUserInfoById(userId);
    if (userData) {
      res.render("users/updateUser.ejs", { user: userData });
      return;
    }
    res.send("Không tìm thấy người dùng");
    return;
  }

  res.send("Không tìm thấy người dùng");
};

const putCRUD = async (req: Request, res: Response): Promise<void> => {
  await updateUserData(req.body);
  res.redirect("/get-crud");
};

const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
  const userId = req.query.id as string | undefined;

  if (userId) {
    await deleteUserById(userId);
    res.redirect("/get-crud");
    return;
  }

  res.send("Không tìm thấy người dùng");
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
