// app/api/users/route.js
export const runtime = "nodejs"; // ensure node runtime so Prisma and bcrypt work

import { NextResponse } from "next/server";
import { hash } from "bcryptjs"; // pure JS implementation (no native deps)
import { prisma } from "@/lib/prisma";

/**
 * POST /api/users
 * Body: { firstName, lastName, email, password, role }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, role } = body ?? {};

    // Debugging: log body (remove in prod)
    console.log("POST /api/users body:", { firstName, lastName, email, role });

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email, password" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = String(email).trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password (bcryptjs returns a promise)
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: normalizedEmail,
        password: hashedPassword,
        status: "ACTIVE",
        emailVerified: false,
      },
      // select: { id: true, name: true, email: true, role: true, createdAt: true } // optional: return subset
    });

    // Remove password field before returning
    const { password: _pwd, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "User created successfully",
        data: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log full error for debugging
    console.error("Error creating user:", String(error));
    console.error(error?.stack);

    // Prisma unique constraint error handling (example for Postgres)
    // You can detect Prisma errors by checking error.code (e.g., 'P2002')
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A unique constraint would be violated (duplicate value)" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
