interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}


export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: primera descripcion',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'En-Proceso Segunda descripcion',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'Terminadas: Tercera descripcion',
      status: 'finished',
      createdAt: Date.now() - 100000
    }
  ]
}