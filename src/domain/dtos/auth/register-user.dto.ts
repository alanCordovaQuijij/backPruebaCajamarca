import { bcryptAdapter } from "../../../config/bcrypt.adapter";
import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["Falta el nombre"];
    if (!email) return ["Falta el email"];
    if (!regularExps.email.test(email)) return ["El correo no es válido"];
    if (!password) return ["Falta la contraseña"];
    if (password.length < 6) return ["Contraseña es muy corta"];

    const hashedPassword = bcryptAdapter.hash(password);

    return [undefined, new RegisterUserDto(name, email, hashedPassword)];
  }
}
