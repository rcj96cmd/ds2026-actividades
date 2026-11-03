import type { PayloadToken } from "./usuarios.types";

// Le avisa a TypeScript que authenticate agrega req.usuario
declare global {
  namespace Express {
    interface Request {
      usuario?: PayloadToken;
    }
  }
}
