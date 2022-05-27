import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatsDto } from './dto/get-stats.dto';
import { StatsService } from './stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
    constructor(private readonly statsService: StatsService) {}

@Post()
catSum(@Body() statsDto: StatsDto){
    return this.statsService.catSum(statsDto);
}
}
