import { VmProperty } from './vmproperty';



export class Vm {
        vmid: string;
        stats: string;
        alerts: string;
        properties: VmProperty;
        customer: number;
        created: string;
        guesthostname: string;
        servername: string;

        constructor(obj?: any) {
            console.log('In VM constructor')
                this.vmid = obj && obj.vmid || null;
                this.customer = obj && Number(obj.customer) || null;
                this.properties = obj && obj.properties || null;
                this.customer = obj && Number(obj.customer) || null;
                this.created = obj && obj.created || null;
                this.guesthostname = obj && obj.guesthostname || null;
                this.servername = obj && obj.servername || null;
                this.alerts = obj && obj.alerts || null;
        }
}


export class VmApi {
        total: number;
        vms: Vm[];
}