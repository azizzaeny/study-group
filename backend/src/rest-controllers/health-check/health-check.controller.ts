import { Get, Controller } from '@nestjs/common';

@Controller('api')
export class HealthCheckController {
    private upTime: number;
    constructor() {
        this.upTime = Date.now();
    }
    @Get('healthcheck')
    async get() {
        const now = Date.now();
        return {
            status: 'API Online',
            uptime: Number((now - this.upTime) / 1000).toFixed(0)
        };
    }
}
