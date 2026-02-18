export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "John Doe",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=john",
  },
  {
    id: "3",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo Account",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=demo",
  },
];
