import SidebarWidget from "./widgets/SidebarWidget.tsx";
import LogoWidget from "./widgets/LogoWidget.tsx";
import ShowSidebarWidget from "./widgets/ShowSidebarWidget.tsx";
import AddSirenWidget from "./widgets/AddSirenWidget.tsx";

export const MapUi = () => {
    return (
        <>
            <ShowSidebarWidget/>
            <AddSirenWidget/>
            <SidebarWidget/>
            <LogoWidget/>
        </>
    )
}