export interface HealthCheckRepository {
  create(data: { interval: number; name: string; url: string }): Promise<void>;
  findAll(params: {
    limit: number;
    page: number;
    search?: string;
  }): Promise<{ id: string; interval: number; name: string; url: string }[]>;
  findById(id: string): Promise<null | { id: string; interval: number; name: string; url: string }>;
}
