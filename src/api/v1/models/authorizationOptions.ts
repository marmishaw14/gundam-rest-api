export interface AuthorizationOptions {
    hasRole: Array<"admin" | "commander" | "pilot">;
    allowSameUser?: boolean;
}