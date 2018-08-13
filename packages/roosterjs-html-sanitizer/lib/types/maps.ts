export type Map<T> = { [name: string]: T };
export type ElementCallbackMap = Map<(element: HTMLElement, context: Object) => boolean>;
export type AttributeCallbackMap = Map<
    (value: string, element: HTMLElement, context: Object) => string
>;
export type StyleCallbackMap = Map<
    (value: string, element: HTMLElement, context: Object) => string
>;
export type StringMap = Map<string>;
