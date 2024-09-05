import {atom, useAtom} from "jotai/index";
import {atomWithStorage, createJSONStorage} from "jotai/utils";
import {axios} from "./axios.ts";
import {useState} from "react";

export type MapFilter = {
    tag: string[]
    mod: number[]
    man: number[]
    cat: string[]
    con: string[]
    ctr: string | null
    sta: string | null
    cty: string | null
}

export const emptyMapFilter: MapFilter = {
    tag: [],
    mod: [],
    man: [],
    cat: [],
    con: [],
    ctr: null,
    sta: null,
    cty: null
}
export type FilterItem = {
    value: string
    label: string
}

const filterDataTagAtom = atom<string[]>([])
const filterDataModAtom = atom<FilterItem[]>([])
const filterDataManAtom = atom<FilterItem[]>([])
const filterDataCatAtom = atom<FilterItem[]>([])
const filterDataConAtom = atom<FilterItem[]>([])
const filterDataCtrAtom = atom<FilterItem[]>([])
const filterDataStaAtom = atom<FilterItem[]>([])
const filterDataCtyAtom = atom<FilterItem[]>([])

const currentFilterAtom = atomWithStorage<MapFilter>('mapFilter', emptyMapFilter, createJSONStorage(), {getOnInit: true})

export const useMapFilter = () => {
    const [tagData, setTagData] = useAtom(filterDataTagAtom)
    const [modData, setModData] = useAtom(filterDataModAtom)
    const [manData, setManData] = useAtom(filterDataManAtom)
    const [catData, setCatData] = useAtom(filterDataCatAtom)
    const [conData, setConData] = useAtom(filterDataConAtom)
    const [ctrData, setCtrData] = useAtom(filterDataCtrAtom)
    const [staData, setStaData] = useAtom(filterDataStaAtom)
    const [ctyData, setCtyData] = useAtom(filterDataCtyAtom)
    const [currentFilter, setCurrentFilter] = useAtom(currentFilterAtom)
    const [statesLoading, setStaLoading] = useState<boolean>(false)
    const [countiesLoading, setCtyLoading] = useState<boolean>(false)

    const loadStateData = (ctr: string) => {
        setStaLoading(true)
        axios.get(`/public/filterdata/country/${ctr}/states`).then(res => {
            setStaLoading(false)
            setStaData(objectToData(res.data))
        })
    }

    const loadCountyData = (ctr: string, sta: string) => {
        setCtyLoading(true)
        axios.get(`/public/filterdata/country/${ctr}/state/${sta}/counties`).then(res => {
            setCtyLoading(false)
            setCtyData(objectToData(res.data))
        })
    }

    return {
        statesLoading,
        countiesLoading,
        loadFilterData: () => {
            axios.get("/public/filterdata/tags").then(res => setTagData(res.data))
            axios.get("/public/filterdata/models").then(res => setModData(objectToData(res.data)))
            axios.get("/public/filterdata/manufacturers").then(res => setManData(objectToData(res.data)))
            axios.get("/public/filterdata/categories").then(res => setCatData(objectToData(res.data)))
            axios.get("/public/filterdata/conditions").then(res => setConData(objectToData(res.data)))
            axios.get("/public/filterdata/countries").then(res => setCtrData(objectToData(res.data)))
            if (currentFilter.ctr) {
                loadStateData(currentFilter.ctr)
                if (currentFilter.sta) {
                    loadCountyData(currentFilter.ctr, currentFilter.sta)
                }
            }
        },
        loadStateData,
        unloadStateData: () => setStaData([]),
        loadCountyData,
        unloadCountyData: () => setCtyData([]),
        isMapFilterActive: currentFilter.tag.length || currentFilter.mod.length || currentFilter.man.length || currentFilter.cat.length || currentFilter.con.length || currentFilter.ctr || currentFilter.sta || currentFilter.cty,
        setCurrentFilter,
        resetCurrentFilter: () => setCurrentFilter(emptyMapFilter),
        currentFilter,
        filterData: {
            tag: tagData,
            mod: modData,
            man: manData,
            cat: catData,
            con: conData,
            ctr: ctrData,
            sta: staData,
            cty: ctyData,
        }
    }
}
const objectToData = (obj: object): FilterItem[] => {
    return Object.entries(obj).map(entry => ({value: entry[0], label: entry[1]}))
}

export const mapFilter2JsonQuery = (mapFilter: MapFilter): string => {
    const urlParams = []
    if (mapFilter.tag.length > 0) urlParams.push("tag=[" + mapFilter.tag.map(x => '"' + x + '"').join() + "]")
    if (mapFilter.mod.length > 0) urlParams.push("mod=[" + mapFilter.mod.join() + "]")
    if (mapFilter.man.length > 0) urlParams.push("man=[" + mapFilter.man.join() + "]")
    if (mapFilter.cat.length > 0) urlParams.push("cat=[" + mapFilter.cat.map(x => '"' + x + '"').join() + "]")
    if (mapFilter.con.length > 0) urlParams.push("con=[" + mapFilter.con.map(x => '"' + x + '"').join() + "]")
    if (mapFilter.ctr) urlParams.push("ctr=" + mapFilter.ctr)
    if (mapFilter.sta) urlParams.push("sta=" + mapFilter.sta)
    if (mapFilter.cty) urlParams.push("cty=" + mapFilter.cty)
    return urlParams.length == 0 ? "" : "?" + urlParams.join('&')
}

export const mapFilter2QueryString = (mapFilter: MapFilter): string => {
    const urlParams = []
    if (mapFilter.tag.length > 0) urlParams.push("tag=" + mapFilter.tag.join())
    if (mapFilter.mod.length > 0) urlParams.push("mod=" + mapFilter.mod.join())
    if (mapFilter.man.length > 0) urlParams.push("man=" + mapFilter.man.join())
    if (mapFilter.cat.length > 0) urlParams.push("cat=" + mapFilter.cat.join())
    if (mapFilter.con.length > 0) urlParams.push("con=" + mapFilter.con.join())
    if (mapFilter.ctr) urlParams.push("ctr=" + mapFilter.ctr)
    if (mapFilter.sta) urlParams.push("sta=" + mapFilter.sta)
    if (mapFilter.cty) urlParams.push("cty=" + mapFilter.cty)

    return urlParams.length == 0 ? "" : "?" + urlParams.join('&')
}
