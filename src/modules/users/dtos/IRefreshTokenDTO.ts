interface IRefreshTokenDTO {
  userId: string;
  expiresDate: Date;
  refreshToken: string;
}

export { IRefreshTokenDTO };
