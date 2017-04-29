export const saveToMobX = (router, ctx) => (toState, fromState, done) => {
    if (!ctx.metaID) {
        ctx.metaID = toState.meta.id
    }

    if (toState.meta.id >= ctx.metaID) {
        ctx.view.setCurrentView(toState);
        ctx.metaID = toState.meta.id;
    } else {
        console.error('old error again');
    }
    done();
}