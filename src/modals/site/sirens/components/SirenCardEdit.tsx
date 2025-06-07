import {Divider, Group, Paper, Stack, Textarea} from "@mantine/core";
import {NewSirenData, SirenOptions} from "../../../../types.d.ts";
import {useState} from "react";
import DeleteCardOverlay from "./components/DeleteSirenOverlay.tsx";
import {useAutoResetState} from "../../../../hooks/autoReset.ts";
import LoadingSirenOverlay from "../../../../components/CardLoadingOverlay.tsx";
import SirenTypeSelect from "./components/SirenTypeSelect.tsx";
import SirenConditionSelect from "./components/SirenConditionSelect.tsx";
import {isNotEmpty, useForm} from "@mantine/form";
import SirenTagsInput from "./components/SirenTagsInput.tsx";
import {apiCreateSiren, apiDeleteSiren, apiUpdateSiren} from "../../../../hooks/backendApi.ts";
import {CancelActionIcon, DeleteActionIcon, SubmitActionIcon} from "./components/CardActionIcon.tsx";
import {useTranslation} from "../../../../hooks/translation.ts";

type SirenCardEditProps = {
    siteId: number
    sirenId?: number
    sirenData?: NewSirenData
    sirenOptions: SirenOptions | undefined
    onClose: (mustRefresh: boolean) => void
}

const tagsValid = (message: string) => {
    return (tags: string[]) => {
        for (const tag of tags) {
            if (!tag.match(/^[a-zA-Z0-9]+$/)) {
                return message;
            }
        }
    }
}

type SirenFormData = {
    type: string | null
    manufacturerId: number | null
    modelId: number | null
    condition: string | null
    description: string | null
    tags: string[]
}

export default ({siteId, sirenId, sirenData, sirenOptions, onClose}: SirenCardEditProps) => {
    const [loadingOverlayVisible, showLoadingOverlay] = useState<boolean>(false)
    const [deleteOverlayVisible, showDeleteOverlay] = useAutoResetState(3000)
    const {t} = useTranslation()

    const sirenForm = useForm<SirenFormData>({
        mode: 'uncontrolled',
        initialValues: {
            manufacturerId: sirenData?.manufacturerId || null,
            modelId: sirenData?.modelId || null,
            type: sirenData ? (sirenData.manufacturerId + ":" + sirenData.modelId) : null,
            condition: sirenData?.condition || null,
            description: sirenData?.description || "",
            tags: sirenData?.tags || []
        },
        transformValues: (values) => ({
            ...values,
            manufacturerId: Number(values.type!.split(":").shift()!),
            modelId: Number(values.type!.split(":").pop()!),
        }),
        validate: {
            type: isNotEmpty(t("$ui.modals.site.sirens.edit.type-error")),
            condition: isNotEmpty(t("$ui.modals.site.sirens.edit.condition-error")),
            tags: tagsValid(t("$ui.modals.site.sirens.edit.tags-error"))
        }
    })

    const onDelete = () => {
        showLoadingOverlay(true)
        apiDeleteSiren(siteId, sirenId!).then(() => {
            onClose(true)
        }).finally(() => {
            showLoadingOverlay(false)
        })
    }

    const onSubmit = (data: SirenFormData) => {
        showLoadingOverlay(true)

        const newSirenData: NewSirenData = {
            manufacturerId: data.manufacturerId!,
            modelId: data.modelId!,
            condition: data.condition!,
            description: data.description,
            tags: data.tags
        }

        if (sirenId == null) {
            apiCreateSiren(siteId, newSirenData).then(() => {
                onClose(true)
            }).finally(() => {
                showLoadingOverlay(false)
            })
        } else {
            apiUpdateSiren(siteId, sirenId, newSirenData).then(() => {
                onClose(true)
            }).finally(() => {
                showLoadingOverlay(false)
            })
        }
    }

    return (
        <Paper withBorder radius={'lg'} p={20} bg={'dark.8'} style={{display: 'flex', flexDirection: 'column', gap: 20, position: 'relative'}}>
            <form onSubmit={sirenForm.onSubmit((values) => onSubmit(values))} style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <Stack gap={10} mb={20}>
                    <SirenTypeSelect
                        placeholder={t("$ui.modals.site.sirens.edit.type")}
                        key={sirenForm.key('type')}
                        {...sirenForm.getInputProps('type')}
                        sirenoptions={sirenOptions}
                    />
                    <SirenConditionSelect
                        placeholder={t("$ui.modals.site.sirens.edit.condition")}
                        key={sirenForm.key('condition')}
                        {...sirenForm.getInputProps('condition')}
                    />
                    <Divider my={10}/>
                    <Textarea
                        key={sirenForm.key('description')}
                        {...sirenForm.getInputProps('description')}
                        rows={5}
                        placeholder={t("$ui.modals.site.sirens.edit.description")}
                    />
                    <SirenTagsInput
                        key={sirenForm.key('tags')}
                        {...sirenForm.getInputProps('tags')}
                        placeholder={t("$ui.modals.site.sirens.edit.tags")}
                    />
                </Stack>

                <Group justify={'space-between'} flex={'1 1 auto'} align={'flex-end'}>
                    <DeleteActionIcon disabled={!sirenId} tooltip={t("$ui.modals.site.sirens.edit.actions.delete")} onClick={() => showDeleteOverlay(true)}/>
                    <Group gap={10}>
                        <CancelActionIcon tooltip={t("$ui.modals.site.sirens.edit.actions.cancel")} onClick={() => onClose(false)}/>
                        <SubmitActionIcon disabled={!sirenForm.isDirty()} tooltip={t("$ui.modals.site.sirens.edit.actions.ok")}/>
                    </Group>
                </Group>
            </form>

            {deleteOverlayVisible && <DeleteCardOverlay onDelete={onDelete} onCancel={() => showDeleteOverlay(false)}/>}
            {loadingOverlayVisible && <LoadingSirenOverlay/>}
        </Paper>
    )
}