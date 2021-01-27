// employees.js
var faker = require("faker");

function generateData() {
  var users = [];
  for (var id = 0; id < 25; id++) {
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var email = faker.internet.email();
    var phone = faker.phone.phoneNumberFormat();
    var birth_date = new Date().toISOString();
    var created_at = new Date().toISOString();
    var updated_at = "";

    const uuid = (Math.random() + 1).toString(36).substring(2);

    users.push({
      id: uuid,
      created_at,
      updated_at,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      birth_date: birth_date,
      address: {
        street: faker.address.streetName(),
        zip_code: faker.address.zipCode(),
        city: faker.address.city(),
        number: Number((Math.random() * (1000 - 10) + 10).toFixed()),
        state: faker.address.state(),
      },
    });
  }

  /**
   * return = {
   *    "data_name": [
   *        { ...data },
   *        { ...data },
   *        { ...data },
   *        { ...data }
   *    ]
   * }
   */
  return { users: users };
}

module.exports = generateData;
