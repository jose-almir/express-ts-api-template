import { HealthCheckRepository } from "../repository/health-check.repository.js";

export class GetHealthCheckUseCase {
  constructor(private readonly repository: HealthCheckRepository) {}

  async execute(command: { id: string }) {
    const record = await this.repository.findById(command.id);
    if (!record) {
      throw new Error("Health check not found");
    }
    return record;
  }
}
