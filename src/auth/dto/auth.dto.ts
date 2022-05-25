import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string

    // constructor({name, password}: AuthDto){
    //     this.name = name;
    //     this.password = password;
    // }
}
