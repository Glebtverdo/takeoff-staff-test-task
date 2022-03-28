export type userType = {
  id : string,
  name: string,
  password: string,
  contacts: [string, string | null][] | null
}

export type myInputPropType = {
	name: string,
	callback: React.Dispatch<React.SetStateAction<string>>,
	pattern: RegExp,
	type: string,
	id: string
} 

export type userTypeNoId = {
  name: string,
  password: string,
  contacts: string[] | null
}