import {ActionIcon, Box, Center, Grid, Group, Loader, Overlay, Pagination, Popover, ScrollArea, Text} from "@mantine/core";
import React, {ReactNode} from "react";
import {IconArrowLeft, IconFilter} from "@tabler/icons-react";
import {useTranslation} from "../hooks/translation.ts";


export type ListDetailsProps = {
    listHeader?: ReactNode | ReactNode[]
    filter?: ReactNode | ReactNode[]
    filterActive?: boolean
    listLoading?: boolean
    listContent: null | ReactNode | ReactNode[]
    detailsLoading?: boolean
    detailsContent: null | ReactNode | ReactNode[]
    paginated?: boolean
    actualPage?: number
    maxPages?: number
    setPage?: (page: number) => void
}

const ListLoader = () => {
    return (
        <Overlay backgroundOpacity={0} blur={3}>
            <Center h={'100%'}>
                <Loader/>
            </Center>
        </Overlay>
    )
}

export default (props: ListDetailsProps) => {
    const {t} = useTranslation()

    return (
        <Grid gutter={'xl'} styles={{root: {flex: '1 1 auto', display: 'flex', flexDirection: 'column'}, inner: {flex: '1 1 auto'}}}>
            <Grid.Col span={4} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column'}}>
                {props.listHeader &&
                    <Box style={{flex: '0 0 auto'}} mb={20}>
                        {props.listHeader}
                    </Box>
                }
                <ScrollArea type={'always'} scrollbars={props.listLoading ? false : 'y'} style={{flex: '1 1 auto', height: 1}}>
                    {props.listLoading && <ListLoader/>}
                    {props.listContent}
                </ScrollArea>
                {props.paginated === true && (
                    <Group mt={20} justify={'space-between'}>
                        {props.filter && (
                            <Popover position="top-start" offset={0}>
                                <Popover.Target>
                                    <ActionIcon color={props.filterActive ? 'red.6' : undefined} size={'sm'}><IconFilter size={16}/></ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    {props.filter}
                                </Popover.Dropdown>
                            </Popover>
                        )}
                        <Pagination disabled={props.listLoading || props.maxPages == null || props.maxPages == 0} size={'xs'} total={props.maxPages || 1} value={props.actualPage || 1}
                                    onChange={props.setPage}/>

                    </Group>
                )}
            </Grid.Col>
            <Grid.Col span={8} style={{flex: '1 1 auto', display: 'flex', flexDirection: 'column'}}>
                {props.detailsContent ? (
                    <ScrollArea type={'always'} offsetScrollbars style={{flex: '1 1 auto', height: 1}}>
                        {props.detailsContent}
                    </ScrollArea>
                ) : (
                    <Center flex={'1 1 auto'}>
                        <Group gap={'10'}>
                            <IconArrowLeft/>
                            <Text>{t('$ui.modals.common.listdetailspanel.select')}</Text>
                        </Group>
                    </Center>
                )}
            </Grid.Col>
        </Grid>
    )
}