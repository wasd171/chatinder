// @flow
export type MessageType = {
    _id: string,
    from: string,
    sentDay: string,
    sentTime: string,
    sentDate: string,
    formattedMessage: string,
    first: boolean,
    firstInNewDay: boolean,
    isGIPHY: boolean
}