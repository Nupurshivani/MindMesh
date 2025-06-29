import { Request, Response, NextFunction } from 'express';
import { IAuthController } from '../interface/IAuthController';
import { IAuthService } from '../../services/interface/IAuthService';
import { HttpStatus } from '../../constants/status.constants';
import { createHttpsError, HttpError } from '../../utils/httpError.utils';
import { HttpResponse } from '../../constants/responseMessage.constants';
import { env } from '../../configs/env.config';
import { IUserModel } from '../../models/user.model';
import { IUserService } from '../../services/interface/IUserService';
import { successResponse } from '../../utils/response';
import { setAccessToken, setRefreshToken } from '../../utils/cookie.util';

export class AuthController implements IAuthController {
  constructor(
    private _authService: IAuthService,
    private _userService: IUserService
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const email = await this._authService.signup(req.body);
 
      res.status(HttpStatus.OK).json(
        successResponse(HttpResponse.OK, {
          email: email,
        })
      );
    } catch (error) {
      next(error);
    }
  }
  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const tokens = await this._authService.signin(email, password);


      setAccessToken(res , tokens.accessToken)
      setRefreshToken(res , tokens.refreshToken)
      
      res.status(HttpStatus.OK).json(
        successResponse(HttpResponse.LOGGED_IN_SUCCESSFULLY, {
          tokens: tokens,
        })
      );
    } catch (err) {
      next(err);
    }
  }
  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { otp, email } = req.body;
      const tokens = await this._authService.verifyOtp(email, otp);

      setAccessToken(res,tokens.accessToken)
      setRefreshToken(res , tokens.refreshToken)

      res
        .status(HttpStatus.CREATED)
        .json(successResponse(HttpResponse.OTP_VERIFIED, { tokens: tokens }));
    } catch (err) {
      next(err);
    }
  }
  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      await this._authService.resendOtp(email);
      res
        .status(HttpStatus.CREATED)
        .json(successResponse(HttpResponse.OTP_RESEND_SUCCESS));
    } catch (err) {
      next(err);
    }
  }
  async refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(HttpStatus.UNAUTHORIZED).json(HttpResponse.UNAUTHORIZED);
        return;
      }

      const refreshToken = authHeader.split(' ')[1];
      if (!refreshToken) {
        throw createHttpsError(HttpStatus.NOT_FOUND, HttpResponse.NO_TOKEN);
      }

      const { newAccessToken, payload } =
        await this._authService.refreshAccessToken(refreshToken);
      
        setAccessToken(res,newAccessToken)
      res
        .status(HttpStatus.OK)
        .json(
          successResponse(HttpResponse.OK, { newAccessToken, user: payload })
        );
    } catch (error) {
      next(error);
    }
  }
  async authMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { accessToken } = req.cookies;
      if (!accessToken) {
        throw createHttpsError(HttpStatus.NOT_FOUND, HttpResponse.NO_TOKEN);
      }
      const user = await this._authService.authMe(accessToken);

      res
        .status(HttpStatus.OK)
        .json(successResponse(HttpResponse.OK, { user: user }));
    } catch (error) {
      next(error);
    }
  }
  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(HttpStatus.UNAUTHORIZED).json(HttpResponse.UNAUTHORIZED);
        return;
      }

      const accessToken = authHeader.split(' ')[1];
      if (!accessToken) {
        throw createHttpsError(HttpStatus.NOT_FOUND, HttpResponse.NO_TOKEN);
      }
      const user = await this._authService.authMe(accessToken);

      res
        .status(HttpStatus.OK)
        .json(successResponse(HttpResponse.OK, { user: user }));
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: env.NODE_ENV === 'production' ? '.mindmesh.space' : undefined,
        path: '/',
      });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: env.NODE_ENV === 'production' ? '.mindmesh.space' : undefined,
        path: '/',
      });
  
      res.status(HttpStatus.OK).json(successResponse(HttpResponse.LOGGED_OUT));
    } catch (err) {
      next(err);
    }
  }
  async googleAuthRedirect(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: HttpResponse.INVALID_CREDENTIALS });
        return;
      }

      const userData: { id: string; email: string; role: string } =
        req.user as { id: string; email: string; role: string };

      const tokens = this._authService.generateTokens(req.user as IUserModel);
      const isBlocked = await this._userService.isStudentsBlocked(
        userData.id as string
      );
      console.log('is Blocked----------------------------------------' + isBlocked)
      if (isBlocked) {
        throw createHttpsError(HttpStatus.FORBIDDEN, HttpResponse.USER_BLOCKED);
      }
      setAccessToken(res,tokens.accessToken)
      setRefreshToken(res, tokens.refreshToken)

      res.redirect(`${env.CLIENT_ORIGIN}`);
    } catch (err: unknown) {
      if (err instanceof HttpError) {
        res.redirect(
          `${env.CLIENT_ORIGIN}/signup?$error=${err.message as string}`
        ); 
      } else {
        res.redirect(
          `${env.CLIENT_ORIGIN}/signup?$error=${HttpResponse.SERVER_ERROR}`
        );
      }
    }
  }
  async forgotPassword(
    req: Request, 
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      await this._authService.forgotPassword(email);
      res
        .status(HttpStatus.OK)
        .json(successResponse(HttpResponse.RESET_LINK_SEND));
    } catch (err) {
      next(err);
    }
  }
  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token, password } = req.body;
      await this._authService.resetPassword(token, password);

      res
        .status(HttpStatus.OK)
        .json(successResponse(HttpResponse.RESET_PASS_SUCCESS));
    } catch (err) {
      next(err);
    }
  }
}
