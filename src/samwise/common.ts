
export interface Model {
    props?:any;
    stateRenderer?: (data: any) => void;
    present(data: any): void;
}

export interface State {
    render(model: any): void;
    representation(model: any): void;
    nextAction(model: any): void;
}

export interface Action {
        (present?: (data: any) => void, ...valueArgs: any[]) : void;
}

export interface View {
    (model: any): void;
}

export interface ViewModel {
    (model: any): any;
}


export class App {
    state: State;
    actions: any;
    model: Model;
    views?: any;
    viewModels?: any;
}
