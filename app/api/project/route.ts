'use server';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { startDate: "desc" } });
    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, startDate, endDate, description, deploymentLink, githubLink } = body ?? {};
    if (!name || !startDate || !description) {
      return NextResponse.json({ error: "name, startDate, and description are required" }, { status: 400 });
    }
    const created = await prisma.project.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description,
        deploymentLink: deploymentLink ?? null,
        githubLink: githubLink ?? null,
      },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create project", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}