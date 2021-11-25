import { client } from "./client";
import { detailFacture } from "./detailFacture";

export class facture {
  idFacture : number ;
  status : boolean ;
  dateFacture : Date ;
  montantFacture : number ;
  montantRemise : number ;
  client : client ;
  detailFacture?: detailFacture
}
