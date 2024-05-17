export type Vaccine = {
  name: string;
  date: Date;
};
  
export type Allergy = {
  name: string;
  reactions: string;
  severity: "mild" | "severe";
};
  
export type Pet = {
  name: string;
  type: string;
  owner: string;
  dob: Date;
  vaccines?: Vaccine[];
  allergies?: Allergy[];
}