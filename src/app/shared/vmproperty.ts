export class VmProperty {
       bronzgb: number;
       cluster: string;
       datacenter: string;
       disks: string;
       goldgb: number;
       guestos:string;
       hddprovisioned: number;
       lastseen: string;
       memorysizegb: number;
       networks: string;
       numcpu:  number;
       numhdd:  number;
       numnic:  number;
       power: string;
       silvergb:  number;
       template:  number;
       vdi:  number;
       vplex: number;

       constructor(obj?: any) {
        this.bronzgb = obj && Number(obj.bronzgb) || null;
        this.cluster = obj && obj.cluster || null;
        this.datacenter = obj && obj.datacenter || null;
        this.disks = obj && obj.disks || null;
        this.goldgb = obj && Number(obj.goldgb) || null;
        this.guestos = obj && obj.guestos || null;
        this.hddprovisioned = obj && Number(obj.hddprovisioned) || null;
        this.lastseen = obj && obj.lastseen || null;
        this.memorysizegb = obj && Number(obj.memorysizegb) || null;
        this.networks = obj && obj.networks || null;
        this.numcpu = obj && Number(obj.numcpu) || null;
        this.numhdd = obj && Number(obj.numhdd) || null;
        this.numnic = obj && Number(obj.numnic) || null;
        this.power = obj && obj.power || null;
        this.silvergb = obj && Number(obj.silvergb) || null;
        this.template = obj && Number(obj.template) || null;
        this.vdi = obj && Number(obj.vdi) || null;
        this.vplex = obj && Number(obj.vplex) || null;
       }
}
