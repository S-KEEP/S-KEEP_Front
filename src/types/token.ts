import { ReactNode } from "react";

export type TokenType = {
  accessToken: string | null;
  refreshToken: string | null;
};

export interface InterceptorProps {
  children: ReactNode;
}