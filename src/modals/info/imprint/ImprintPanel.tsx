import {Box, Center, Divider, Image, ScrollArea, Stack, Text} from "@mantine/core";
import {useTranslation} from "../../../hooks/translation.ts";

export default () => {
    const {t} = useTranslation()
    return (
        <ScrollArea style={{flex: '1 1 auto', height: 1}}>
            <Stack mx={20} my={40} style={{flex: '1 1 auto'}}>
                <Center>
                    <Image h={50} src={"logo.svg"}/>
                </Center>
                <Box style={{textAlign: 'center'}} mb={40}>
                    <Text>Version {import.meta.env.VITE_APP_VERSION}</Text>
                    <Text size={'sm'} mt={5} mx={40} c={'red.6'}>{t("$ui.modals.info.info.alpha")}</Text>
                </Box>
                <Divider label={"Disclaimer"}/>
                <Text mx={40} style={{textAlign: 'center'}}>{t("$ui.modals.info.info.disclaimer")}</Text>
            </Stack>
        </ScrollArea>
    )
}