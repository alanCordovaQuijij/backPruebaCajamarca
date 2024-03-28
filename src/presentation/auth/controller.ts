import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos";
import { prisma } from "../../data/postgres";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthController {
  constructor() {}

  registerUser = async (req: Request, res: Response) => {
    const email = req.body.email;

    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    //console.log("Email: " , email);
    const isExistUser = await prisma.user.findFirst({
      where: { email },
    });

    if (isExistUser) return res.status(400).json("Correo ya existe");

    const user = await prisma.user.create({
      data: registerDto!,
    });

    const { password, ...rest } = user;

    const token = await JwtAdapter.generateToken({id: user.id, email: user.email});
    if(!token) return res.status(500).json('Error generando token');

    res.json({
      user: rest,
      token: token,
    });
  };

  loginUser = async (req: Request, res: Response) => {
    const email = req.body.email;
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const isExistUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!isExistUser)
      return res.status(400).json("Usuario o contraseña incorrectos");

    const isMatching = bcryptAdapter.compare(
      loginUserDto!.password,
      isExistUser.password
    );

    if (!isMatching)
      return res.status(400).json("Usuario o contraseña incorrectos");

    const { password, ...rest } = isExistUser;

    const token = await JwtAdapter.generateToken({id: isExistUser.id, email: isExistUser.email});
    if(!token) return res.status(500).json('Error generando token');

    res.json({
      user: rest,
      token: token,
    });
  };
}
