import error from "@/app/(front-end)/error";
import { NextResponse } from "next/server";

const { default: z } = require("zod");

const jobCreateSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  salaryRange: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  companyName: z.string().max(200).optional(),
  companyLogo: z.string().url().or(z.literal("")).optional(),
  jobType: z.string().max(100).optional(),
  applicationEmail: z.string().email().optional(),
  applicationUrl: z.string().url().optional(),
  benefits: z.string().optional(),
  category: z.string().optional(),
  experienceLevel: z.string().optional(),
  remotePolicy: z.string().optional(),
  requirements: z.string().optional(),
});

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        {
          error: "Invalid JSON body",
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!data.postedById) {
      return NextResponse.json(
        {
          error:
            "postedById is required (or enable sever-side session to set it)",
        },
        { status: 400 }
      );
    }

    const allowedFields = [
        
    ]
  } catch (error) {}
}
