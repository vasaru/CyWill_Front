export class Cost {
    public id: string;
    public costname: string;
    public currency: string;
    public amount: string;
    public costtype: string;
    public validfrom: string;
    public validto: string;
    public description: string;


  constructor(values: Object = {}) {
      Object.assign(this, values);
  } 

}