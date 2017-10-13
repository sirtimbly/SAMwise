import {Model} from '../samwise';
/** 
 * AssignmentProps
 */
export class AssignmentProps {
    fulltime: number;
    parttime: number;
    requested: number;
    total: number;
    isEditing: true;
    isValid: boolean;

    constructor (data?: any) {
        if (data) {
            this.fulltime = data.fulltime || 0;
            this.parttime = data.parttime || 0;
            this.requested = data.requested || 0;
            this.total = data.total || 0;
            this.isEditing = data.isEditing || 0;
        }
    }
}

/**
 * AssignmentModel
 */
export class AssignmentModel implements Model {
    
    props: AssignmentProps;
    // the renderer method will be implementation specific each time this model is used
    stateRenderer: (data:AssignmentProps) => void; 

    constructor () {
        this.props = new AssignmentProps({
            fulltime:20,
            parttime:30,
            requested:80
        });
    }

    present = (data: any) => {  
        let data_ = new AssignmentProps();
        if (data !== undefined) {
            data_.fulltime = data.fulltime || this.props.fulltime;
            data_.parttime = data.parttime || this.props.parttime;
            data_.requested = data.requested || this.props.requested;
            if (data.isEditing !== undefined) {
                this.props.isEditing = data.isEditing;
            }
        }
        var newTotal = Number(data_.fulltime) + Number(data_.parttime);
        console.log("newtotal", newTotal)
        if (newTotal <= this.props.requested) {
            this.props.fulltime = data_.fulltime;
            this.props.parttime = data_.parttime;
        } else {
            if (data.fulltime && !data.parttime) {
                this.props.fulltime = data_.fulltime - (newTotal - this.props.requested);
            }
            if (data.parttime && !data.fulltime) {
                this.props.parttime = data_.parttime - (newTotal - this.props.requested);
            }
            
        }

        //always recalculate total
        this.props.total = this.props.fulltime + this.props.parttime;
        //finally we close the functional reactive loop
        this.stateRenderer(this.props)
    }

    
}
