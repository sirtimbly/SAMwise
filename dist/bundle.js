/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var App = (function () {
    function App() {
    }
    return App;
}());
exports.App = App;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = m;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var assignment_model_1 = __webpack_require__(0);
var common_1 = __webpack_require__(1);
var m = __webpack_require__(2);
var app = new common_1.App;
app.model = new assignment_model_1.AssignmentModel();
var AppViewActions;
(function (AppViewActions) {
    /**
 * Actions (the UI sends messages out to the model)
 * - changeAction() updates the model mased on slider events, the present() method has a default value so we don't have to leak model coupling into our views
 * - loadAction() gets new data will usually just be called when the app is first initialized
 */
    AppViewActions.changeAction = function (target, value, present) {
        if (present === void 0) { present = app.model.present; }
        var data_ = new assignment_model_1.AssignmentProps();
        data_[target] = Number(value);
        present(data_);
    };
    AppViewActions.loadAction = function (present) {
        console.log("load: pretend we have an api call here");
        present(new assignment_model_1.AssignmentProps({
            fulltime: 20,
            parttime: 30,
            requested: 80,
            isEditing: true
        }));
    };
    AppViewActions.switchToReview = function (present) {
        if (present === void 0) { present = app.model.present; }
        present(new assignment_model_1.AssignmentProps({ isEditing: false }));
    };
    AppViewActions.switchToEdit = function (present) {
        if (present === void 0) { present = app.model.present; }
        present(new assignment_model_1.AssignmentProps({ isEditing: true }));
    };
})(AppViewActions || (AppViewActions = {}));
/**
 * AppState (when the model updates, examine it and determine how to update the UI)
 * - editing
 * - reviewing
 */
var AppState = (function () {
    function AppState() {
        var _this = this;
        this.render = function (model) {
            if (model.total >= model.requested) {
                console.log("do some error stuff here - like a toast");
            }
            _this.representation(model);
            _this.nextAction(model);
            //throw new Error('Method not implemented.');
        };
        this.representation = function (model) {
            m.render(document.getElementById('tabs'), m(AppViewComponents.Tabs, model));
            var component;
            if (model.isEditing) {
                component = AppViewComponents.Edit;
            }
            else {
                component = AppViewComponents.Review;
            }
            m.render(document.getElementById('mainapp'), m(component, model));
        };
        this.nextAction = function (model) {
            // throw new Error('Method not implemented.');
        };
    }
    return AppState;
}());
app.state = new AppState();
//setting the default model stateRenderer to state function is important for decoupling state implementation from the model implementation
app.model.stateRenderer = app.state.render;
/**
 * App View Components (these functions make the actual UI layer updates).
 *  They are bound to the action implementations of the app.actions object.
 * + edit
 *  - slider
 * + review
 */
var AppViewComponents;
(function (AppViewComponents) {
    /**
     * Slider Component ViewModel
     */
    var SliderVM = (function () {
        function SliderVM() {
        }
        return SliderVM;
    }());
    AppViewComponents.SliderVM = SliderVM;
    var ProgressVM = (function () {
        function ProgressVM() {
        }
        return ProgressVM;
    }());
    AppViewComponents.ProgressVM = ProgressVM;
    AppViewComponents.Tabs = {
        view: function (vnode) {
            return m("div.clearfix.mx2", [
                m("button.btn.col.col-2", {
                    class: vnode.attrs.isEditing ? 'bg-blue' : 'bg-cyan',
                    onclick: function (e) { AppViewActions.switchToEdit(); }
                }, 'Edit'),
                m("button.btn.col.col-2", {
                    class: !vnode.attrs.isEditing ? 'bg-blue' : 'bg-cyan',
                    onclick: function (e) { AppViewActions.switchToReview(); }
                }, 'Review'),
            ]);
        }
    };
    /**
     * Slider is a component with heading and a range input that changes either fulltime or parttime values
     */
    AppViewComponents.Slider = {
        view: function (vnode) {
            return m("div.clearfix", [
                m("div", {
                    class: "title"
                }, vnode.attrs.count + " " + vnode.attrs.name + " shifts assigned."),
                m("input.col.col-10", {
                    type: "range",
                    min: "0",
                    max: "100",
                    value: vnode.attrs.count,
                    onchange: function (e) { AppViewActions.changeAction(vnode.attrs.name, e.target.value); }
                }),
            ]);
        }
    };
    /**
     * MaxProgress Component
     */
    AppViewComponents.MaxProgress = {
        view: function (vnode) {
        }
    };
    /**
     * Edit Component includes multiple sliders
     */
    AppViewComponents.Edit = {
        view: function (vnode) {
            var sl1 = new SliderVM();
            sl1.count = vnode.attrs.fulltime;
            sl1.name = 'fulltime';
            var sl2 = new SliderVM();
            sl2.count = vnode.attrs.parttime;
            sl2.name = 'parttime';
            console.log(vnode.attrs);
            return m('div.border.p2.mx2.clearfix', [
                m('progress.col.col-10', {
                    value: (vnode.attrs.requested - vnode.attrs.parttime),
                    max: vnode.attrs.requested
                }),
                m('progress.col.col-10', {
                    value: (vnode.attrs.fulltime),
                    max: 100
                }),
                m(AppViewComponents.Slider, sl1),
                m('progress.col.col-10', {
                    value: (vnode.attrs.requested - vnode.attrs.fulltime),
                    max: vnode.attrs.requested
                }),
                m('progress.col.col-10', {
                    value: (vnode.attrs.parttime),
                    max: 100
                }),
                m(AppViewComponents.Slider, sl2),
                m(AppViewComponents.Footer, vnode.attrs)
            ]);
        }
    };
    /**
     * Footer shows schedule versus total and a checkmark icon
     */
    AppViewComponents.Footer = {
        view: function (vnode) {
            var matchClass = (vnode.attrs.total === vnode.attrs.requested) ? 'icon-ok' : '';
            return m('span', vnode.attrs.total + ' / ' + vnode.attrs.requested, m('span', { class: matchClass }));
        }
    };
    /**
     * Review Component
     */
    AppViewComponents.Review = {
        view: function (vnode) {
            return m("div.border.mx2", [
                m("table.table", [
                    m("tbody", [
                        m("tr", [
                            m("td", "Full Time Slots"),
                            m("td", vnode.attrs.fulltime)
                        ]),
                        m("tr", [
                            m("td", "Part Time Slots"),
                            m("td", vnode.attrs.parttime)
                        ]),
                        m("tr.text-bold.bg-blue", [
                            m("td", "Total"),
                            m("td", [
                                m(AppViewComponents.Footer, vnode.attrs)
                            ])
                        ])
                    ])
                ])
            ]);
        }
    };
})(AppViewComponents || (AppViewComponents = {}));
console.log("initial view state");
AppViewActions.loadAction(app.model.present);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map