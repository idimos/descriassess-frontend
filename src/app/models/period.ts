export  class  Period {
    _id: string;
    name:string;
    notes: string;
    subperiods:[];
    enddate: Date;
    startdate:Date;
    active:Boolean;
}