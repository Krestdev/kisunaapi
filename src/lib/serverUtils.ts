import os from "os";

export async function checkModules(
  modules: {
    name: string;
    version: string;
    url: string;
    status: string;
  }[]
) {
  // utils/serviceHealth.ts
  const results: Record<
    string,
    { connected: boolean; details?: unknown; message?: string }
  > = {};

  for (const module of modules) {
    try {
      const res = await fetch(module.url); // 2s timeout
      const data = await res.json();
      results[module.name] = { connected: true, details: data };
      modules = modules.map((m) =>
        m.name === module.name ? { ...m, status: "active" } : m
      );
    } catch {
      results[module.name] = { connected: false, message: "error" };
      modules = modules.map((m) =>
        m.name === module.name ? { ...m, status: "inactive" } : m
      );
    }
  }

  return modules;
}

export function findIpAddress(): string | null {
  // utils/ip.ts

  const nets = os.networkInterfaces();

  for (const addrs of Object.values(nets)) {
    if (!addrs) continue;
    for (const addr of addrs) {
      if (addr.family === "IPv4" && !addr.internal) {
        return addr.address; // first non-internal IPv4
      }
    }
  }
  return null;
}
