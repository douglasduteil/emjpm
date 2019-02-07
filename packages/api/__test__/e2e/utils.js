//


exports.userTypes = {
  mandataire: {
    username: "jeremy",
    password: "johnson123"
  },
  service: {
    username: "service1",
    password: "service1"
  },
  ti: {
    username: "ti1",
    password: "ti1"
  },
  admin: {
    username: "admin",
    password: "admin"
  }
};

exports.logMeIn = async (userType = exports.userTypes.mandataire) => {
  return await request(server)
    .post("/auth/login")
    .send(userType);
}