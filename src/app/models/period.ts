export  class  Period {
    _id: string;
    name:string;
    notes: string;
    subperiods:[any];
    enddate: Date;
    startdate:Date;
    active:Boolean;
}