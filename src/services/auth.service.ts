// this service is only for example

export const loginUser = async (email: string, password: string) => {
  console.log(email, password);
  return {
    token: "token",
    user: { email },
  };
};
