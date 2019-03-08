export interface Auth{
  id?: string,
  token?: string,
  expires_in?: string,
  username?: string,
  password?: string
  permissions?: Permissions[],
  roles?: Roles[]
}

export enum Roles{  
  User = "User",
  Admin = "Admin",
  SuperUser = "SuperUser",
}

export enum Permissions{
  ViewPosts = "ViewPosts",
  CreatePosts = "CreatePosts",
  EditPosts= "EditPosts",
  DeletePosts= "DeletePosts"
}