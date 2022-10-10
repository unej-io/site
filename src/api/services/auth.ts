const AuthService = {
  async verifyAuthToken(token: string) {
    try {
      return token === "example-auth-token";
    } catch (error) {
      return false;
    }
  },
};

export default AuthService;
