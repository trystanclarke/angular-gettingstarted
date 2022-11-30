import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:"convertToSpaces"
})
export class ConvertToSpacesPipe implements PipeTransform {
    
    transform(value: any, character:string ):string {
        
        let inputStr = value as string;
        let retVal = inputStr.replace(character, " ");
        return retVal;
    }

}