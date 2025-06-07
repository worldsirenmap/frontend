export type UserSession = {
    username: string
    email: string
    sessionId: string
}

export type NearbySite = {
    id: number
    longitude: number,
    latitude: number,
    distance: number,
    icon: string,
    sirens: [{
        manufacturer: string,
        model: string,
        icon: string,
        condition: SirenCondition
    }]
}

export type Page<T> = {
    items: T[]
    actualPage: number
    maxPages: number
}

export type Model = {
    id: number
    shortname: string
    manufacturer: string
    category: SirenCategory
    icon: string
}

export type ModelDetails = {
    id: number
    shortname: string
    manufacturers: string[]
    category: SirenCategory
    description: string
    icon: string
}

export type Manufacturer = {
    id: number
    shortname: string
    origin: string
    categories: SirenCategory[]
    modelCount: number
}

export type SiteDetails = {
    id: number
    latitude: number
    longitude: number
    country: string
    countryCode: string
    state: string
    county: string | undefined
    description: string | undefined
}

export type SiteSirenList = SirenDetails[]

export type SirenDetails = {
    id: number
    manufacturerId: number
    manufacturer: string
    modelId: number
    model: string
    category: SirenCategory
    powerSource: SirenPowerSource
    rotational: boolean
    icon: string
    condition: SirenCondition
    description: string | null
    tags: string[] | null
}

export type NewSirenData = {
    manufacturerId: number
    modelId: number
    condition: string
    description: string | null
    tags: string[] | null
}

export type SiteNoteList = SiteNote[]

export type SiteNote = {
    id: number
    userName: string
    userId: number
    note: string
    created: string
    modified: string
}

export type SiteChangeList = SiteChange[]

export type SiteChange = {
    id: number
    username: string
    userId: number
    targetId: number
    changeEvent: string
    changeParams: string[]
    changedAt: string
}

export type SirenOptions = SirenOption[]

export type SirenOption = {
    modelId: number
    model: string
    manufacturerId: number
    manufacturer: string
    icon: string
    category: string
}


export enum PopupContext {
    MAP,
    MARKER,
    LOCKED_MARKER,
    SIREN_SITE,
}

export type PopupState = {
    context: PopupContext
    longitude: number
    latitude: number
}

export type TooltipState = {
    text: string
    longitude: number
    latitude: number
}

export enum PopupAction {
    LOCK_MARKER,
    UNLOCK_MARKER,
    MOVE_TO_CENTER,
    ADD_SIREN_SITE,
    EDIT_SIREN_SITE,
}

export type LocalMarkerState = {
    grabbed?: boolean
    longitude?: number
    latitude?: number
}

export type SirenCountByXList = SirenCountByX[]

export type SirenCountByX = {
    label: string
    total: number
    percentage: number
}

export type SirenCountByModelList = SirenCountByModel[]

export type SirenCountByModel = {
    model: string
    manufacturer: string
    icon: string
    total: number
    percentage: number
}

export type SirenCountByMonthList = SirenCountByMonth[]

export type SirenCountByMonth = {
    month: string
    added: number
    total: number
}

export type SirenCategory = 'ELECTRONIC' | 'MECHANIC' | 'SUPERCHARGED' | 'PNEUMATIC' | 'HORN' | 'UNKNOWN'
export type SirenPowerSource = 'MAINS' | 'BATTERY' | 'ENGINE' | 'MANUAL' | 'AIRTANK' | 'OTHER' | 'UNKNOWN'
export type SirenCondition = 'ACTIVE' | 'DEFECT' | 'INACTIVE' | 'PLANNED' | 'REMOVED' | 'UNKNOWN'