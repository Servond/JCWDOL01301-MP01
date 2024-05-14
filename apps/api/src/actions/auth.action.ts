import { HttpException } from '@/exceptions/HttpException';
import { Auth } from './../interface/auth.interface';
import { compare, genSalt, hash } from 'bcrypt';
import { UserQuery } from '@/queries/user.query';
import { User } from '@/interface/user.interface';
import { AuthQuery } from '@/queries/auth.query';
import { API_KEY } from '@/config';
import { sign } from 'jsonwebtoken';

export class AuthAction {
    private userQuery = new UserQuery()
    private authQuery = new AuthQuery()

  public async registerAction({ name, email, password }: Auth): Promise<User> {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (findUser) {
        throw new HttpException(500, 'User with that email already exists');
      }

      const salt = await genSalt(10);
      const hashPass = await hash(password, salt);

      const result = await this.authQuery.registerQuery(name, email, hashPass);


      return result;
    } catch (error) {
      throw error;
    }
  }

  public loginAction = async ({ email, password }: Auth) => {
    try {
        const findUser = await this.userQuery.getUserByEmail(email)

        if(!findUser)
            throw new HttpException(500, "User with that email doesn't exist")

        const isValid = await compare(password, findUser.password)

        if(!isValid)
            throw new HttpException(500, "Incorrect Password")

        const payload = {
            email: findUser.email,
            isVerified: findUser.isVerified
        }

        const token = sign(payload, String(API_KEY), { expiresIn: "1hr"})

        return token
    } catch (error) {
        throw error
    }
  }

  public refreshTokenAction = async (email: string) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (!findUser) throw new HttpException(500, "Something went wrong");

      const payload = {
        email: findUser.email,
        isVerified: findUser.isVerified,
      };

      const token = sign(payload, String(API_KEY), { expiresIn: "1hr" });

      return token;
    } catch (err) {
      throw err;
    }
  };

  public verifyAction = async (email: string) => {
    try {
      const findUser = await this.userQuery.getUserByEmail(email);

      if (!findUser) throw new HttpException(500, "Something went wrong");

      await this.authQuery.verifyQuery(findUser.email);
    } catch (err) {
      throw err;
    }
  };
}

// export class AuthAction {
//     userQuery = new UserQuery()

//     public async registerAction({ name, email, password }: Auth) {

//     }
// }
