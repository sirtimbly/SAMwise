import {Model} from "../samwise";
/**
 * AssignmentProps
 */
export class AssignmentProps {
    public fulltime: number;
    public parttime: number;
    public requested: number;
    public total: number;
    public isEditing: boolean;
    public isValid: boolean;
    public ptAvail: number;
    public ftAvail: number;

    constructor(data?: any) {

        if (data) {
            this.fulltime = data.fulltime || 0;
            this.parttime = data.parttime || 0;
            this.requested = data.requested || 0;
            this.total = data.total || 0;
            this.isEditing = data.isEditing || 0;
        }
    }
}
