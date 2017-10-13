"use strict";
exports.__esModule = true;
/**
 * AssignmentProps
 */
var AssignmentProps = (function () {
    function AssignmentProps(data) {
        if (data) {
            this.fulltime = data.fulltime || 0;
            this.parttime = data.parttime || 0;
            this.requested = data.requested || 0;
            this.total = data.total || 0;
            this.isEditing = data.isEditing || 0;
        }
    }
    return AssignmentProps;
}());
exports.AssignmentProps = AssignmentProps;
/**
 * AssignmentModel
 */
var AssignmentModel = (function () {
    function AssignmentModel() {
        var _this = this;
        this.present = function (data) {
            var data_ = new AssignmentProps();
            if (data !== undefined) {
                data_.fulltime = data.fulltime || _this.props.fulltime;
                data_.parttime = data.parttime || _this.props.parttime;
                data_.requested = data.requested || _this.props.requested;
                if (data.isEditing !== undefined) {
                    _this.props.isEditing = data.isEditing;
                }
            }
            var newTotal = Number(data_.fulltime) + Number(data_.parttime);
            console.log("newtotal", newTotal);
            if (newTotal <= _this.props.requested) {
                _this.props.fulltime = data_.fulltime;
                _this.props.parttime = data_.parttime;
            }
            else {
                if (data.fulltime && !data.parttime) {
                    _this.props.fulltime = data_.fulltime - (newTotal - _this.props.requested);
                }
                if (data.parttime && !data.fulltime) {
                    _this.props.parttime = data_.parttime - (newTotal - _this.props.requested);
                }
            }
            //always recalculate total
            _this.props.total = _this.props.fulltime + _this.props.parttime;
            //finally we close the functional reactive loop
            _this.stateRenderer(_this.props);
        };
        this.props = new AssignmentProps({
            fulltime: 20,
            parttime: 30,
            requested: 80
        });
    }
    return AssignmentModel;
}());
exports.AssignmentModel = AssignmentModel;
