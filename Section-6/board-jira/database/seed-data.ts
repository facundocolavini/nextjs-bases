/* Data para cargar la base de datos por defecto */
interface SeedData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: "pending" | "in-progress" | "finished";
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendientes: Description 1",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "En-Progreso: Description 2",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Terminadas:Description 3",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
