import { Logger } from "#config/logging.js";

import { HealthCheckRepository } from "../repository/health-check.repository.js";

export class GetHealthCheckUseCase {
  constructor(
    private readonly repository: HealthCheckRepository,
    private readonly logger: Logger,
  ) {}

  async execute(command: { id: string }) {
    const record = await this.repository.findById(command.id);
    if (!record) {
      this.logger.warn("Health check not found", { command });
      throw new Error("Health check not found");
    }
    this.logger.info("Health check found", { command, record });
    return record;
  }
}
