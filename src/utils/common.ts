export type SagaCallback<DataType = void, CallbackReturnType = void> = (args: {
  ok: boolean;
  message?: string;
  data?: DataType;
}) => CallbackReturnType;
export type ExtractCallbackType<T extends (...args: any) => any> =
  ReturnType<T> extends { payload: { callback?: SagaCallback<infer R> } } ? R : unknown;

/**
 * Useful to be able to wait for a callback to execute before continuing
 */
export function promisifiedCallback<CallbackDataType = void>(
  callback?: SagaCallback<CallbackDataType>
): {
  callback: SagaCallback<CallbackDataType>;
  promise: Promise<Parameters<SagaCallback<CallbackDataType>>[0]>;
} {
  let callbackWithContext: SagaCallback<CallbackDataType> = () => {};

  const promise = new Promise((s: (result: Parameters<SagaCallback<CallbackDataType>>[0]) => void) => {
    callbackWithContext = (params) => {
      if (callback) callback(params);
      s(params);
    };
  });
  return {
    promise,
    callback: callbackWithContext,
  };
}
