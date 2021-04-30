import { EnumMember } from "typescript";

export const enumKeys = <E>(e: E): (keyof E)[] => {
  return Object.keys(e) as (keyof E)[];
}

export const getEnumValue = <T extends { [index: string]: string }>(key: string, enumObj: T): string => {
  for (const enumKey of enumKeys(enumObj)) {
    if (key === enumKey) return enumObj[key]
  }
  return ''
}

export const validateKeyEnum = (value: string, enumObj: any): boolean => {
  for (const key of enumKeys(enumObj)) {
    if (value === key) return true
  }
  return false
}

export const validateEnum = (value: string, enumObj: EnumMember): boolean => {
  for (const key of enumKeys(enumObj)) {
    const item: string = enumObj[key];
    if (value === item) return true
  }
  return false
}