import {IconBuildingBroadcastTower, IconChevronRight, IconHistory, IconMap2, IconMapPin, IconMessage, IconPhoto} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import {useModalAtom} from "../../../config/atoms.ts";
import useAxios from "axios-hooks";
import {Badge, Group, Loader, Switch, Tabs, Text, Tooltip} from "@mantine/core";
import {SiteDetails, SiteNote} from "../../../config/api.ts";
import MapsPanel from "./MapsPanel.tsx";
import SirensPanel from "./sirens/SirensPanel.tsx";
import NotesPanel from "./NotesPanel.tsx";
import {useCurrentUser} from "../../../hooks/currentUser.ts";
import {useState} from "react";

export default () => {
    const {modalParams} = useModalAtom()
    const {isAuthenticated} = useCurrentUser()
    const [editMode, setEditMode] = useState(false)

    const [{data: site, loading: siteLoading}] = useAxios<SiteDetails>("/site/" + modalParams!.siteId)
    const [{data: notes, loading: notesLoading}] = useAxios<SiteNote[]>("/site/" + modalParams!.siteId + "/notes")

    return (
        <Modal
            name={"site"}
            title={"Siren site #" + modalParams!.siteId}
            size={"60vw"}
            icon={IconMapPin}
        >
            <Tabs defaultValue={'sirens'}>
                <Tabs.List>
                    <Tabs.Tab
                        value="map"
                        leftSection={<IconMap2/>}
                        disabled={siteLoading}
                    >
                        Google Maps
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="sirens"
                        leftSection={<IconBuildingBroadcastTower/>}
                        rightSection={siteLoading ? <Loader size={'xs'}/> : <Badge size={'sm'}>{site?.sirens.length}</Badge>}
                        disabled={siteLoading}
                    >
                        Sirens
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="photos"
                        leftSection={<IconPhoto/>}
                    >
                        Photos
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="notes"
                        leftSection={<IconMessage/>}
                        rightSection={notesLoading ? <Loader size={'xs'}/> : notes?.length > 0 ? <Badge size={'sm'}>{notes?.length}</Badge> : null}
                        disabled={notesLoading}
                    >
                        Notes
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="changes"
                        leftSection={<IconHistory/>}
                    >
                        Changes
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={'map'} h={'60vh'} py={10}><MapsPanel lat={site?.latitude} lon={site?.longitude}/></Tabs.Panel>
                <Tabs.Panel value={'sirens'} h={'60vh'} py={20} style={{display: 'flex', flexDirection: 'column'}}>
                    <SirensPanel sirens={site?.sirens} editMode={editMode}/>
                </Tabs.Panel>
                <Tabs.Panel value={'photos'} h={'60vh'}>d</Tabs.Panel>
                <Tabs.Panel value={'notes'} h={'60vh'} py={'10p'} style={{display: 'flex', flexDirection: 'column'}}>
                    <NotesPanel notes={notes} editMode={editMode}/>
                </Tabs.Panel>
                <Tabs.Panel value={'changes'} h={'60vh'}>d</Tabs.Panel>
            </Tabs>

            <Group justify={'space-between'}>
                <Group gap={5}>
                    {site?.countryCode && <img
                        style={{height: '12px', filter: 'brightness(50%)', marginRight: 5}}
                        alt={site?.countryCode}
                        src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/" + site?.countryCode.toUpperCase() + ".svg"}
                    />}

                    <Text size={'sm'} c={'dimmed'}>{site?.country}</Text>
                    {site?.state && <><IconChevronRight color={'#555'} size={14}/><Text size={'sm'} c={'dimmed'}>{site?.state}</Text></>}
                    {site?.county && <><IconChevronRight color={'#555'} size={14}/><Text size={'sm'} c={'dimmed'}>{site?.county}</Text></>}
                    <IconChevronRight color={'#555'} size={14}/><Text size={'sm'} c={'dimmed'}>{site?.latitude}, {site?.longitude}</Text>
                </Group>
                <div>
                    {isAuthenticated && (
                            <Switch
                                size={'xs'}
                                onChange={(e) => setEditMode(e.target.checked)}
                            />
                    )}
                </div>
            </Group>

        </Modal>
    )
}