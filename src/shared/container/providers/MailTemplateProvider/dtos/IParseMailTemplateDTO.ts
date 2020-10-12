interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMAilTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
