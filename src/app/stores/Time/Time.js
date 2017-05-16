import utils from 'mobx-utils'
import { computed } from 'mobx'

export class Time {
	@computed get now() {
		return utils.now(5000)
	}
}
