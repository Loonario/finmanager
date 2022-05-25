import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {

    @ApiProperty()
    readonly name: string

    @ApiProperty({default: 0})
    readonly balance?: number
}
