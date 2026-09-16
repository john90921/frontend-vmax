export const createDispatchWithLogging = <T>(dispatch: (action: T) => void,fileName: string) => {
    return (action: T) => {
        console.log(`Action in ${fileName}:`, action);
        dispatch(action);
        console.log(`Action in ${fileName} dispatched successfully.`);
    }
}
