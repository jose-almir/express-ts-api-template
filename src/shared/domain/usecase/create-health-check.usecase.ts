import { Logger } from "#config/logging.js";

import { HealthCheckRepository } from "../repository/health-check.repository.js";

export class CreateHealthCheckUseCase {
  constructor(
    private readonly repository: HealthCheckRepository,
    private readonly logger: Logger,
  ) {}

  async execute(command: { interval: number; name: string; url: string }) {
    await this.repository.create(command);
    this.logger.info("Health check created", { command });
  }
}
