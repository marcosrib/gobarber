interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMAilTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
