import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

// Handle POST requests
export async function POST(request) {
  try {
    const result = await prisma.user.createMany({
      data: [
        { name: "Galib", email: "galib@prisma.com" },
        { name: "Tania", email: "tania@prisma.com" },
      ],
    });

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// Handle GET requests
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
