import ListDetailsPanel from "../ListDetailsPanel.tsx";
import ListItem from "../ListItem.tsx";
import FilterPanelDetails from "./FilterPanelDetails.tsx";

export default () => {
    return (
        <ListDetailsPanel
            listContent={
                <ListItem>
                    Current Filter
                </ListItem>
            }
            detailsContent={
                <FilterPanelDetails/>
            }
        />
    )
}