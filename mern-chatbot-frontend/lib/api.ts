const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    return res.json();
  },

  signup: async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      throw new Error("Signup failed");
    }

    return res.json();
  },

  sendMessage: async (message: string, chatId?: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, chatId }),
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    return res.json();
  },

  getChats: async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch chats");
  }

  return data;
},
};
