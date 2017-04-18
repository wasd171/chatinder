// @flow
export function sendMessage(obj, args, ctx) {
    return ctx.tinder.sendMessage(args.id, args.message)
}