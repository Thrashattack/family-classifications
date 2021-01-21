export type User = {
  login: string;
  password: string;
};

export type Authentication = {
  token: string;
  expires: Date;
};
