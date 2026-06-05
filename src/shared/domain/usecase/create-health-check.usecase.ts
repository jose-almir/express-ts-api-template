import { HealthCheckRepository } from "../repository/health-check.repository.js";

export class CreateHealthCheckUseCase {
  constructor(private readonly repository: HealthCheckRepository) {}

  async execute(command: { interval: number; name: string; url: string }) {
    await this.repository.create(command);
  }
}
