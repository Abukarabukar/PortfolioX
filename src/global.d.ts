// src/global.d.ts
declare var module: NodeModule & {
    hot?: {
      accept(path?: string, callback?: () => void): void;
    };
  };
  