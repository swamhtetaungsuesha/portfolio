import "./env";

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

export class DatabaseConfigs {
  host: string = process.env.POSTGRES_HOST || "";
  port: number = parseInt(process.env.DATABASE_PORT || "5432");
  user: string = process.env.POSTGRES_USER || "";
  password: string = process.env.POSTGRES_PASSWORD || "";
  name: string = process.env.POSTGRES_DATABASE || "";

  constructor({
    host,
    port,
    user,
    password,
    name,
  }: Partial<DatabaseConfig> = {}) {
    if (host) {
      this.host = host;
    }

    if (port) {
      this.port = port;
    }

    if (user) {
      this.user = user;
    }

    if (password) {
      this.password = password;
    }

    if (name) {
      this.name = name;
    }
  }

  connectionString(protocol: string = "postgresql") {
    if (
      !protocol ||
      !this.host ||
      !this.port ||
      !this.user ||
      !this.password ||
      !this.name
    ) {
      throw new Error("Database configuration is not set");
    }

    const connectionString = `${protocol}://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;

    return connectionString;
  }
}

export const dbConfigs = new DatabaseConfigs();
