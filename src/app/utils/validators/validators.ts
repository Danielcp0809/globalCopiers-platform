import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static validPassword(control: AbstractControl){
    const value = control.value; /// lo que usuario tenga como password
    if(!constainsNumber(value)||!constainsMinus(value)||!constainsMayus(value)||!constainsSpecialCharacter(value)||constainsWhiteSpace(value)){
      return {noNumber: !constainsNumber(value), noSpecial: !constainsSpecialCharacter(value), noMayus :!constainsMayus(value), noMinus: !constainsMinus(value), whiteSpaces: constainsWhiteSpace(value)}
    }
    return null; /// si no hay un error retornar nulo
  }

  static matchPassword(control: AbstractControl){
    const password = control.get('password')?.value;  
    const confirmpassword = control.get('confirmPassword')?.value;
    if(password === confirmpassword){
      return null
    } else {
      return {match_password:true}
    }
  }
}

function constainsNumber(value: string){
  return value.match(/[0-9]+/g) !== null
}

function constainsMayus(value: string){
  return value.match(/[A-Z]+/g) !== null
}

function constainsMinus(value: string){
  return value.match(/[a-z]+/g) !== null
}

function constainsSpecialCharacter(value: string){
  return value.match(/\W/g) !== null
}

function constainsWhiteSpace(value: string){
  return value.match(/\s/g) !== null
}
