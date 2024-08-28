import {
    Alert,
    Box,
    CloseButton,
    Flex,
    Grid,
    Input,
    Loader,
    ScrollArea,
    Stack,
    Text,
    UnstyledButton
} from "@mantine/core";
import {IconMoodPuzzled, IconMoodWrrrFilled, IconSearch} from "@tabler/icons-react";
import useAxios from "axios-hooks";
import {Model, NearbySite} from "../../../config/api.ts";
import classes from "./Library.module.css"
import {useState} from "react";
import SirenCategoryBadge from "../../ui/SirenCategoryBadge.tsx";

type ModelListItemProps = {
    model: Model
}

const ModelListItem = ({model} : ModelListItemProps) => {
    return (
        <UnstyledButton
            className={classes.listitem}
        >
            <Flex
                gap="md"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="nowrap"
            >
                <img alt="Icon"
                     src={'https://api.worldsirenmap.net/assets/siren-icons/' + model.icon + '.svg'}/>
                <Stack gap={5} style={{flex: '1 1 auto'}}>
                    <Text lh={1} fw={'bold'}>{model.shortname}</Text>
                    <Text lh={1} size={'sm'}>{model.manufacturer}</Text>
                </Stack>
                <SirenCategoryBadge category={model.category}/>
            </Flex>
        </UnstyledButton>
    )
}

export default () => {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const [{data, error, loading}] = useAxios<NearbySite[]>({
        url: "/public/library/model",
        params: {
            search: searchTerm
        }
    })

    return (
        <Grid mt={20} gutter={'xl'}>
            <Grid.Col span={4} style={{display: 'flex', flexDirection: 'column', height: '70vh'}}>
                <Box style={{flex: '0 0 auto'}} mb={20}>
                    <Input size={'xs'} radius="xl" placeholder="Search ..."

                           rightSectionPointerEvents="all"
                           rightSection={searchTerm.length ? <CloseButton onClick={() => setSearchTerm("")} size={'xs'}/> : <></>}
                           leftSection={loading ? <Loader size={16} type={'dots'} /> : <IconSearch size={16}/>}
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>

                <ScrollArea offsetScrollbars style={{flex: '1 1 auto'}}>
                    {error && <Alert variant="light" color="red" title="Error loading siren models!"
                                     icon={<IconMoodWrrrFilled/>}>{error.message}</Alert>}
                    {data && data.length == 0 && <Alert variant="light" color="yellow" title="No models found!"
                                                        icon={<IconMoodPuzzled/>}>Change your search term or category filter.</Alert>}
                    {data && data.map((model, index) => <ModelListItem key={index} model={model}/>)}
                </ScrollArea>

            </Grid.Col>
            <Grid.Col span={8} style={{display: 'flex', flexDirection: 'column', height: '70vh'}}>
                <ScrollArea offsetScrollbars style={{flex: '1 1 auto'}}>
                    Content
                </ScrollArea>
            </Grid.Col>
        </Grid>
    )
}