import { bcryptAdapter } from "../../../config/bcrypt.adapter";
import { regularExps } from "../../../config/regular-exp";

export class LoginUserDto {
  constructor(
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Falta el email"];
    if (!regularExps.email.test(email)) return ["El correo no es válido"];
    if (!password) return ["Falta la contraseña"];
    if (password.length < 6) return ["Contraseña es muy corta"];

    

    return [undefined, new LoginUserDto(email, password)];
  }
}
