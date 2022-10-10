const FAKE_SISTER_DB_USER: {
  username: string;
  password: string;
}[] = [
  {
    username: "182410103012",
    password: "12345678",
  },
];

const FAKE_ORG_DB_USER: {
  username: string;
  token: string;
}[] = [
  {
    username: "unej.io",
    token: "unej.io",
  },
];

const FAKE_DB_USER: {
  username: string;
}[] = [
  {
    username: "flamrdevs",
  },
];

function fakeFetchToSisterDB(data: { username: string; password: string }) {
  return FAKE_SISTER_DB_USER.find((user) => user.username === data.username && user.password === data.password);
}

function fakeFetchToOrgDB(data: { username: string; token: string }) {
  return FAKE_ORG_DB_USER.find((user) => user.username === data.username && user.token === data.token);
}

function fakeFetchToDB(data: { username: string }) {
  return FAKE_DB_USER.find((user) => user.username === data.username);
}

const UserService = {
  async findByUsername(username: string) {
    return fakeFetchToDB({ username });
  },
  async verifyAsStudent(username: string, password: string) {
    return fakeFetchToSisterDB({ username, password });
  },
  async verifyAsOrganization(username: string, token: string) {
    return fakeFetchToOrgDB({ username, token });
  },
};

export default UserService;
