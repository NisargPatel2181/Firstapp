export type User = {
    user: UserDetail
  };

export type UserDetail = {
  firstname: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
    profileImage?: string;
    imageUri?: string;
}