// @flow
export function isAuthorized(obj, args, ctx) {
    return ctx.tinder.isAuthorized();
}