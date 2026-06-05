import { describe, expect, it, vi } from "vitest";

import { HealthCheckRepository } from "#shared/domain/repository/health-check.repository.js";
import { GetHealthCheckUseCase } from "#shared/domain/usecase/get-health-check.usecase.js";

describe("GetHealthCheckUseCase", () => {
  it("should return health check record when found", async () => {
    const repository: HealthCheckRepository = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn().mockResolvedValue({
        id: "test-id",
        interval: 60,
        name: "Test Health Check",
        url: "https://example.com/health",
      }),
    };
    const useCase = new GetHealthCheckUseCase(repository);

    const result = await useCase.execute({ id: "test-id" });

    expect(repository.findById).toHaveBeenCalledWith("test-id");

    expect(result).toEqual({
      id: "test-id",
      interval: 60,
      name: "Test Health Check",
      url: "https://example.com/health",
    });
  });

  it("should throw when health check is not found", async () => {
    const repository: HealthCheckRepository = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn().mockResolvedValue(null),
    };
    const useCase = new GetHealthCheckUseCase(repository);

    await expect(useCase.execute({ id: "non-existent-id" })).rejects.toThrow(Error);
  });
});
