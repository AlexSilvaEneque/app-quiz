import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'

library.add(faCircleCheck, faCircleXmark)

export default ['font-icon', FontAwesomeIcon]