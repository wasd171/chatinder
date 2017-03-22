export const saveToMobX = (router, {store}) => (toState, fromState, done) => {
    store.view.setCurrentView(toState);
    done();
}