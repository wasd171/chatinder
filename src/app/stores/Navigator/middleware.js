export const saveToMobX = (router, ctx) => (toState, fromState, done) => {
    console.log({toState, fromState, ctx});
    if (!ctx.metaID) {
        ctx.metaID = toState.meta.id
    }

    if (toState.meta.id >= ctx.metaID) {
        ctx.view.setCurrentView(toState);
        ctx.metaID = toState.meta.id;
    }
    done();
}