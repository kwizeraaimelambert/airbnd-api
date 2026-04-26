export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    role: "host" | "guest";
    avatarUrl: string;
    bio: string;
}
export declare const users: User[];
//# sourceMappingURL=users.model.d.ts.map