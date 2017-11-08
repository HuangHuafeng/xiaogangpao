export class Player {
  number: number
  name: string
  organization: string

  constructor(number: number, name: string, organization: string = '') {
    this.number = number
    this.name = name
    this.organization = organization
  }
}
