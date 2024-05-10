import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    // TODO: IsInt, isPositive, min 1.
    @IsInt()
    @Min( 1 )
    @IsPositive()
    no: number;

    //TODO: IsString, minLength 1.
    @IsString()
    @MinLength(1)
    name: string;

}
