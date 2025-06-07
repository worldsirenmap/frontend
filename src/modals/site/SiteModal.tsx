import {IconBuildingBroadcastTower, IconChevronRight, IconHistory, IconMap2, IconMapPin, IconMessage, IconPhoto} from "@tabler/icons-react";
import Modal from "../Modal.tsx";
import useAxios from "axios-hooks";
import {Anchor, Badge, Group, Loader, Switch, Tabs, Text, Tooltip} from "@mantine/core";
import {SiteChangeList, SiteDetails, SiteNoteList, SiteSirenList} from "../../types.d.ts";
import MapsPanel from "./map/MapsPanel.tsx";
import SirensPanel from "./sirens/SirensPanel.tsx";
import NotesPanel from "./notes/NotesPanel.tsx";
import {useCurrentUser} from "../../hooks/currentUser.ts";
import {useEffect, useState} from "react";
import PanelNoContent from "../../components/PanelNoContent.tsx";
import ChangesPanel from "./changes/ChangesPanel.tsx";
import {useTranslation} from "../../hooks/translation.ts";
import CountryFlag from "../../components/CountryFlag.tsx";
import {useUrlParams} from "../../hooks/navigation.ts";
import {useClipboard} from "@mantine/hooks";

export default () => {
    const {isAuthenticated} = useCurrentUser()
    const [editMode, setEditMode] = useState(false)
    const {t} = useTranslation();
    const params = useUrlParams()
    const clipboard = useClipboard({ timeout: 1000 });

    const siteId = params[0]

    const [{data: site, loading: siteLoading}, refetchSite] = useAxios<SiteDetails>("/site/" + siteId)
    const [{data: sirens, loading: sirensLoading}, refetchSirens] = useAxios<SiteSirenList>("/site/" + siteId + "/sirens")
    const [{data: notes, loading: notesLoading}, refetchNotes] = useAxios<SiteNoteList>("/site/" + siteId + "/notes")
    const [{data: changes, loading: changesLoading}, refetchChanges] = useAxios<SiteChangeList>("/site/" + siteId + "/changes")

    const refetchAll = () => {
        refetchSite()
        refetchSirens()
        refetchNotes()
        refetchChanges()
    }

    useEffect(() => {
        if (editMode) {
            refetchSite()
            refetchSirens()
            refetchNotes()
            refetchChanges()
        }
    }, [editMode, refetchSite, refetchSirens, refetchNotes, refetchChanges]);

    return (
        <Modal
            title={t("$ui.modals.site.title")}
            size={"60vw"}
            icon={IconMapPin}
        >
            <Tabs defaultValue={'sirens'} variant="outline" styles={{root: {flex: '1 1 auto', display: 'flex', flexDirection: 'column'}}}>
                <Tabs.List>
                    <Tabs.Tab
                        value="map"
                        leftSection={<IconMap2/>}
                        rightSection={siteLoading ? <Loader size={'xs'}/> : null}
                        disabled={siteLoading}
                    >
                        {t("$ui.modals.site.tabs.maps")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="sirens"
                        leftSection={<IconBuildingBroadcastTower/>}
                        rightSection={sirensLoading ? <Loader size={'xs'}/> : <Badge fz={'80%'} size={'sm'}>{sirens ? sirens!.length : "0"}</Badge>}
                        disabled={sirensLoading}
                    >
                        {t("$ui.modals.site.tabs.sirens")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="photos"
                        leftSection={<IconPhoto/>}
                    >
                        {t("$ui.modals.site.tabs.photos")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="notes"
                        leftSection={<IconMessage/>}
                        rightSection={notesLoading ? <Loader size={'xs'}/> : (notes && notes.length > 0) ? <Badge fz={'80%'} size={'sm'}>{notes?.length}</Badge> : null}
                        disabled={notesLoading}
                    >
                        {t("$ui.modals.site.tabs.notes")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="changes"
                        leftSection={<IconHistory/>}
                        rightSection={changesLoading ? <Loader size={'xs'}/> : (changes && changes.length > 0) ? <Badge fz={'80%'} size={'sm'}>{changes?.length}</Badge> : null}
                        disabled={changesLoading}
                    >
                        {t("$ui.modals.site.tabs.changes")}
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={'map'} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    {site
                        ? <MapsPanel lat={site.latitude} lon={site.longitude}/>
                        : <PanelNoContent/>
                    }
                </Tabs.Panel>
                <Tabs.Panel value={'sirens'} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    {(site && sirens)
                        ? <SirensPanel siteId={site.id} sirens={sirens} editMode={editMode} onRefresh={() => refetchAll()}/>
                        : <PanelNoContent/>
                    }
                </Tabs.Panel>
                <Tabs.Panel value={'photos'} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    <PanelNoContent/>
                </Tabs.Panel>
                <Tabs.Panel value={'notes'} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    {site && notes && notes.length > 0
                        ? <NotesPanel notes={notes} editMode={editMode}/>
                        : <PanelNoContent/>
                    }
                </Tabs.Panel>
                <Tabs.Panel value={'changes'} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column', paddingTop: 20}}>
                    {site && changes && changes.length > 0
                        ? <ChangesPanel changes={changes} editMode={editMode}/>
                        : <PanelNoContent/>
                    }
                </Tabs.Panel>
            </Tabs>

            <Group justify={'space-between'}>
                <Group gap={5}>
                    {site?.countryCode && <CountryFlag size={12} countryCode={site.countryCode}/>}
                    {site?.country && <><Text size={'sm'} c={'dimmed'}>{site?.country}</Text><IconChevronRight color={'#555'} size={14}/></>}
                    {site?.state && <><Text size={'sm'} c={'dimmed'}>{site?.state}</Text><IconChevronRight color={'#555'} size={14}/></>}
                    {site?.county && <><Text size={'sm'} c={'dimmed'}>{site?.county}</Text><IconChevronRight color={'#555'} size={14}/></>}
                    <Anchor size={'sm'} onClick={() => clipboard.copy(site?.latitude + "," + site?.longitude)}>{clipboard.copied ? "Kopiert!" : site?.latitude + ", " + site?.longitude}</Anchor>
                </Group>
                {isAuthenticated && (
                    <Group>
                        {editMode && <Text size={'xs'} c={'dark.4'}>ID: {site?.id}</Text>}
                        <Tooltip label={t("$ui.modals.common.actions.editmode")} refProp="rootRef">
                            <Switch
                                size={'xs'}
                                onChange={(e) => setEditMode(e.target.checked)}
                            />
                        </Tooltip>
                    </Group>
                )}
            </Group>

        </Modal>
    )
}