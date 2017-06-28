import { AbstractRefetcherParams } from '.'

export abstract class AbstractRefetcher extends AbstractRefetcherParams {
	abstract notifyAllMatches: () => void
	abstract notifyMatch: (id: string) => void
	abstract notifyMatchBlocked: (id: string) => void
}
