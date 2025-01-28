// src/controllers/UserController.js
import UserModel from '../models/UserModel';

export default class UserController {
  static fetchUsers() {
    return UserModel.getUsers();
  }
}
