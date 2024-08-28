import {Alert, Badge, ColorSwatch, Divider, Flex, Group, ScrollArea, Stack, Text, UnstyledButton} from "@mantine/core";
import classes from "./Sidebar.module.css";
import {useMap} from "react-map-gl/maplibre";
import {formatDistanceEU} from "../../map/mapUtils.ts";
import useAxios from "axios-hooks";
import {useHoveredState, useLoading, useMarkerState} from "../../../config/atoms.ts";
import {NearbySite} from "../../../config/api.ts";
import {useEffect, useRef, useState} from "react";
import {IconMoodWrrrFilled} from "@tabler/icons-react";
import StatusBadge from "../StatusBadge.tsx";


export default () => {
    const listVierportRef = useRef<HTMLDivElement>(null)
    const {map} = useMap()
    const [markerState] = useMarkerState()
    const [hoveredState, setHoveredState] = useHoveredState()
    const [scrollInto, setScrollInto] = useState<boolean>(true)
    const [_, setLoading] = useLoading()

    const [{data, error, loading}] = useAxios<NearbySite[]>({
        url: "/public/sites/nearby",
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

    return (<>
            <Divider label={loading ? "Loading nearby siren sites ..." : "Nearest 100 siren sites around marker"}/>
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
                                    icon: site.icon,
                                    longitude: site.coordinates.longitude,
                                    latitude: site.coordinates.latitude,
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
                                        lng: site.coordinates.longitude,
                                        lat: site.coordinates.latitude
                                    }
                                })
                            }}>
                            <Stack>
                                {site.installations.map(installation => (
                                    <Flex
                                        className={classes.installation}
                                        gap="md"
                                        justify="flex-start"
                                        align="center"
                                        direction="row"
                                        wrap="nowrap"
                                    >
                                        <img alt="Icon"
                                             src={'https://api.worldsirenmap.net/assets/siren-icons/' + installation.icon + '.svg'}/>
                                        <Stack gap={5} style={{flex: '1 1 auto'}}>
                                            <Text lh={1} fw={'bold'}>{installation.model}</Text>
                                            <Text lh={1} size={'sm'}>{installation.manufacturer}</Text>
                                        </Stack>
                                        <Stack gap={5} align={'flex-end'}>
                                            <Text c="dimmed" size={'xs'}>{formatDistanceEU(site.distance)}</Text>
                                            <StatusBadge status={installation.status}/>
                                        </Stack>
                                    </Flex>
                                ))}
                            </Stack>
                        </UnstyledButton>
                ))}
            </ScrollArea>
        </>
    )
}