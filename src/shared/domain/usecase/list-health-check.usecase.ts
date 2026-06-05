import { HealthCheckRepository } from "#shared/domain/repository/health-check.repository.js";

export class ListHealthCheckUseCase {
  constructor(private readonly repository: HealthCheckRepository) {}

  async execute(command: { limit: number; page: number; search?: string }) {
    const { limit, page, search } = command;
    const records = await this.repository.findAll({ limit, page, search });
    return records;
  }
}
