import {Alert, Box, Grid, Loader, ScrollArea} from "@mantine/core";
import {ReactNode} from "react";

export type ListDetailsProps = {
    listHeader?: null | ReactNode | ReactNode[]
    listLoading?: null | boolean
    listContent: null | ReactNode | ReactNode[]
    detailsLoading?: null | boolean
    detailsContent: null | ReactNode | ReactNode[]
}

const ListLoader = () => {
    return <Alert
        color={'gray'}
        title={"Data is loading ..."}
        icon={<Loader size={'xs'}/>}
    />
}

export default ({listHeader, listLoading, listContent, detailsLoading, detailsContent}: ListDetailsProps) => {
    return (
        <Grid mt={20} gutter={'xl'}>
            <Grid.Col span={4} style={{display: 'flex', flexDirection: 'column', height: '70vh'}}>
                {listHeader &&
                    <Box style={{flex: '0 0 auto'}} mb={20}>
                        {listHeader}
                    </Box>
                }
                {listLoading === true ? <ListLoader/> :
                    <ScrollArea offsetScrollbars style={{flex: '1 1 auto'}}>
                        {listContent}
                    </ScrollArea>
                }
            </Grid.Col>
            <Grid.Col span={8} style={{display: 'flex', flexDirection: 'column', height: '70vh'}}>
                {detailsLoading === true ? <ListLoader/> :
                    <ScrollArea offsetScrollbars style={{flex: '1 1 auto'}}>
                        {detailsContent}
                    </ScrollArea>
                }
            </Grid.Col>
        </Grid>
    )
}