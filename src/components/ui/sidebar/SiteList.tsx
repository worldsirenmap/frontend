import {Alert, Flex, ScrollArea, Stack, Text, UnstyledButton} from "@mantine/core";
import classes from "./Sidebar.module.css";
import {useMap} from "react-map-gl/maplibre";
import {formatDistanceEU} from "../../map/mapUtils.ts";
import useAxios from "axios-hooks";
import {useHoveredState, useLoading, useMarkerState} from "../../../config/atoms.ts";
import {NearbySite} from "../../../config/api.ts";
import {useEffect, useRef, useState} from "react";
import {IconMoodWrrrFilled} from "@tabler/icons-react";
import StatusBadge from "../StatusBadge.tsx";
import {mapFilter2QueryString, useMapFilter} from "../../../config/mapFilter.ts";


export default () => {
    const listVierportRef = useRef<HTMLDivElement>(null)
    const {map} = useMap()
    const [markerState] = useMarkerState()
    const [hoveredState, setHoveredState] = useHoveredState()
    const [scrollInto, setScrollInto] = useState<boolean>(true)
    const {currentFilter} = useMapFilter()
    const [_, setLoading] = useLoading()

    const [{data, error, loading}] = useAxios<NearbySite[]>({
        url: "/public/sites/nearby" + mapFilter2QueryString(currentFilter),
        params: {
            longitude: markerState.longitude,
            latitude: markerState.latitude,
        }
    })

    useEffect(() => {
        setLoading(loading)
        if (!loading) {
            listVierportRef.current?.scrollTo(0, 0)
        }
    }, [loading]);

    useEffect(() => {
        if (hoveredState && scrollInto) {
            listVierportRef.current
                ?.querySelector('[data-item-id="' + hoveredState?.id + '"]')
                ?.scrollIntoView({
                    block: 'center',
                    behavior: 'instant',
                })
        }
    }, [hoveredState]);

    return (
        <ScrollArea
            viewportRef={listVierportRef}
            style={{flex: "1 1 auto"}}
            type={'always'}
        >
            {error && <Alert variant="light" color="red" title="Error loading nearby sirens!"
                             icon={<IconMoodWrrrFilled/>}>{error.message}</Alert>}
            {data && data.map((site: NearbySite) => (
                <UnstyledButton
                    data-item-id={site.id}
                    key={site.id}
                    className={classes.listitem}
                    mod={{hovered: hoveredState?.id === site.id}}
                    onMouseEnter={() => {
                        setHoveredState({
                            id: site.id,
                            icon: site.sirens.length > 1 ? 'multi' + site.sirens.length : site.sirens[0].icon,
                            longitude: site.longitude,
                            latitude: site.latitude,
                        })
                        setScrollInto(false)
                    }}
                    onMouseLeave={() => {
                        setHoveredState(null)
                        setScrollInto(true)
                    }}
                    onClick={() => {
                        map!.flyTo({
                            center: {
                                lng: site.longitude,
                                lat: site.latitude
                            }
                        })
                    }}>
                    <Stack>
                        {site.sirens.map((siren, index) => (
                            <Flex
                                key={index}
                                className={classes.installation}
                                gap="md"
                                justify="flex-start"
                                align="center"
                                direction="row"
                                wrap="nowrap"
                            >
                                <img alt="Icon"
                                     src={'https://api.worldsirenmap.net/assets/siren-icons/' + siren.icon + '.svg'}/>
                                <Stack gap={5} style={{flex: '1 1 auto'}}>
                                    <Text lh={1} fw={'bold'}>{siren.model}</Text>
                                    <Text lh={1} size={'sm'}>{siren.manufacturer}</Text>
                                </Stack>
                                <Stack gap={5} align={'flex-end'}>
                                    <Text c="dimmed" size={'xs'}>{formatDistanceEU(site.distance)}</Text>
                                    <StatusBadge status={siren.condition}/>
                                </Stack>
                            </Flex>
                        ))}
                    </Stack>
                </UnstyledButton>
            ))}
        </ScrollArea>
    )
}