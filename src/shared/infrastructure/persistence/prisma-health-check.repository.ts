import { HealthCheckRepository } from "#shared/domain/repository/health-check.repository.js";

import { prisma } from "./prisma-client.js";

export class PrismaHealthCheckRepository implements HealthCheckRepository {
  async create(data: { interval: number; name: string; url: string }): Promise<void> {
    await prisma.healthCheck.create({
      data: {
        interval: data.interval,
        name: data.name,
        url: data.url,
      },
    });
  }

  async findAll(params: {
    limit: number;
    page: number;
    search?: string;
  }): Promise<{ id: string; interval: number; name: string; url: string }[]> {
    const records = await prisma.healthCheck.findMany({
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      where: params.search
        ? {
            name: {
              contains: params.search,
              mode: "insensitive",
            },
          }
        : undefined,
    });
    return records;
  }

  async findById(
    id: string,
  ): Promise<null | { id: string; interval: number; name: string; url: string }> {
    const record = await prisma.healthCheck.findUnique({
      where: { id },
    });

    if (!record) {
      return null;
    }

    return {
      id: record.id,
      interval: record.interval,
      name: record.name,
      url: record.url,
    };
  }
}
