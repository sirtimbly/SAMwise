
// var assignmentModel = {
//   fulltime: 40,
//   parttime: 10,
//   total: 50,
//   requested: 80,
//   isEditing: false
// }
// assignmentModel.present = function(data) {
//   console.log("new data presented to model", data)
//   if (data !== undefined) {
//     var data_ = {};
//     data_.fulltime = data.fulltime || assignmentModel.fulltime;
//     data_.parttime = data.parttime || assignmentModel.parttime;
//     data_.requested = data.requested || assignmentModel.requested;
//   } 
//   console.log("data_", data_)
//   var newTotal = Number(data_.fulltime) + Number(data_.parttime);
//   console.log("newtotal", newTotal)
//   if (newTotal <= assignmentModel.requested) {
//       assignmentModel.fulltime = data_.fulltime;
//       assignmentModel.parttime = data_.parttime;
//       assignmentModel.total = newTotal;
//    } else {
     
//    }
  
//   console.log('updated model, calling state.render ', assignmentModel)
//   state.render(assignmentModel);
// }


// var assignmentActions = {}

// assignmentActions.load = function(present) {
//   console.log('loading')
  
//     //pretending we made an api call and it's now complete
//     console.log('calling present')
//     present({
//       fulltime:20,
//       parttime:30,
//       requested:80
//     })
//   }


// assignmentActions.change = function({
//   value,
//   target
// }, present) {
//   console.log("action:change", {value, target})
//   present = present || assignmentModel.present; //this makes event listeners cleaner but binds us
//   var data_ = {};
//   data_[target] = value;
//   present(data_);
// }

// var vm = {};

// vm.reviewData = function(model) {
//   return {
//     fulltime: model.fulltime || 0,
//     parttime: model.parttime || 0,
//     total: Number(model.fulltime) + Number(model.parttime)
//   }
// }

// var Slider = {
//   view: function(vnode) {
//     return m("main.border.rounded.m1.p1", [
//       m("h1", {
//         class: "title"
//       }, vnode.attrs.count + " " + vnode.attrs.name + " shifts assigned."),
//       m("input", {
//         type: "range",
//         min: "0",
//         max: "100",
//         value: vnode.attrs.count,
//         onchange: function(e) {
//           assignmentActions.change({
//             value: e.target.value,
//             target: vnode.attrs.name
//           })
//         }
//       }),
//     ])

//   }
// }

// var Edit = {
//   view: function(vnode) {
//     console.log(vnode.attrs)
//     return m('div.border.p2.m2', [
//       m(Slider, {count: vnode.attrs.fulltime, name: 'fulltime'}),
//       m(Slider, {count: vnode.attrs.parttime, name: 'parttime'})
//     ]);
//   }
// }

// var Review = {
//   view: function(vnode) {
//     return m("table.table", [
//       m("tbody", [
//         m("tr", [
//           m("td", "Full Time Slots"),
//           m("td", vnode.attrs.fulltime)
//         ]),
//         m("tr", [
//           m("td", "Fullt Time Slots"),
//           m("td", vnode.attrs.fulltime)
//         ]),
//         m("tr.text-bold.bg-blue", [
//           m("td", "Total"),
//           m("td", vnode.attrs.total)
//         ])
//       ])
//     ])
//   }
// }

// var state = {};

// state.render = function(model) {
//   console.log("state.render");
//   state.representation(model);
//   state.nextAction(model);
// }

// state.representation = function(model) {
//   //check values to determine current app state
//   console.log('sate.representation -- finally time for the view')
//   editView(model);
// }

// state.nextAction = function(model) {
//   console.log('state.nextaction')
// }

// function editView(model) {
//   console.log("running editview")
//   m.render(document.getElementById('results'), m(Edit, model));
// }

// console.log("window onload");
// state.render(assignmentActions.load(assignmentModel.present))
//   //assignmentModel.present(assignmentActions.load()), state.renderer()
//   //assignmentActions.load(assignmentModel.present(state.renderer))


// //essentially state control
// // m.route(results, "/edit", {
// //   "/edit": m(Edit, assignmentModel),
// //   "/review": m(Review, vm.reviewData(assignmentModel))
// // })
