import {Image, useMantineTheme} from "@mantine/core";
import {forwardRef} from "react";

type CountryFlagProps = {
    size: number
    countryCode: string
}
export default forwardRef<HTMLImageElement, CountryFlagProps>((props, ref) => {
    const theme = useMantineTheme()
    const color = theme.colors.wsm[6].substring(1)

    return <Image
        ref={ref}
        h={props.size}
        w={props.size / 2 * 3}
        alt={"CountryFlag of " + props.countryCode}
        src={"http://purecatamphetamine.github.io/country-flag-icons/3x2/" + props.countryCode.toUpperCase() + ".svg"}
        fallbackSrc={"https://placehold.co/300x200/" + color + "/ffffff?text=" + props.countryCode.toUpperCase()}
    />
})