// src/models/UserModel.js
export default class UserModel {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  
    static getUsers() {
      return [
        new UserModel(1, 'John Doe', 'john@example.com'),
        new UserModel(2, 'Jane Doe', 'jane@example.com'),
      ];
    }
  }
  