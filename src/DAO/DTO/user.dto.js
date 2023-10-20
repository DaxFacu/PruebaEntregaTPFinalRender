export default class UsertDTO {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.age = user.age;

    // this.active = true;
    // this.phone = contact.phone ? contact.phone.split("-").join("") : "";
  }
}
